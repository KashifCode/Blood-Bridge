// IMPORTS -
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErr = require("../middlewares/catchAsyncErr");
const bloodBankModel = require("../models/bloodBankModel");
const tokenModel = require("../models/tokenModel");
const setToken = require("../utils/jwtToken");
const crypto = require("crypto");
const sendEmail = require("../utils/email");

// REGISTER A BLOOD BANK -
exports.registerBloodBank = catchAsyncErr(async (req, res, next) => {
  const { name, email, password, licenseNo, city, address } = req.body;

  let blood_bank = await bloodBankModel.findOne({ email });

  if (blood_bank) {
    return next(
      new ErrorHandler("The email address you entered is already in use", 409)
    );
  } else {
    blood_bank = await bloodBankModel.create({
      name,
      email,
      password,
      licenseNo,
      city,
      address,
    });

    const token = await new tokenModel({
      BloodBankId: blood_bank._id,
      token: crypto.randomBytes(32).toString("hex"),
    }).save();

    const url = `${process.env.BASE_URL}/${blood_bank.id}/verify/${token.token}`;

    await sendEmail({
      email: blood_bank.email,
      subject: "Blood Bridge Email Verification",
      message: `Click the given link to verify your account: ${url}`,
    });

    res.status(201).json({
      success: true,
      message:
        "Your account has been created! Please verify your email address to log in",
    });
  }
});

// VERIFY BLOOD BANK -
exports.verifyBloodBank = catchAsyncErr(async (req, res, next) => {
  const bloodBank = await bloodBankModel.findOne({ _id: req.params.id });

  if (!bloodBank) {
    return next(new ErrorHandler("Invalid email verification link", 400));
  }

  const token = await tokenModel.findOne({
    BloodBankId: bloodBank._id,
    token: req.params.token,
  });

  if (!token) {
    return next(new ErrorHandler("Invalid email verification link", 400));
  }

  await bloodBankModel.updateOne({ _id: bloodBank._id, verified: true });
  await token.deleteOne();

  res.status(200).json({
    success: true,
    message: "Thank you for verifying your email address",
  });
});

// LOGIN BLOOD BANK -
exports.loginBloodBank = catchAsyncErr(async (req, res, next) => {
  const { licenseNo, password } = req.body;

  if (!licenseNo || !password) {
    return next(
      new ErrorHandler("Please enter the license number and password", 400)
    );
  }

  const bloodBank = await bloodBankModel
    .findOne({ licenseNo })
    .select("+password");

  if (!bloodBank) {
    return next(
      new ErrorHandler("Your license number or password is incorrect", 401)
    );
  }

  if (!bloodBank.verified) {
    let token = await tokenModel.findOne({ BloodBankId: bloodBank._id });

    if (!token) {
      token = await new tokenModel({
        BloodBankId: bloodBank._id,
        token: crypto.randomBytes(32).toString("hex"),
      }).save();

      const url = `${process.env.BASE_URL}/${bloodBank.id}/verify/${token.token}`;

      await sendEmail({
        email: bloodBank.email,
        subject: "Blood Bridge Email Verification",
        message: `Click the given link to verify your account: ${url}`,
      });
    }
    return next(
      new ErrorHandler(
        "Activate your account by clicking the link in the email",
        400
      )
    );
  }

  const isPasswordMatched = await bloodBank.comparePassword(password);

  if (!isPasswordMatched) {
    return next(
      new ErrorHandler("Your license number or password is incorrect", 401)
    );
  }
  setToken(bloodBank, 200, res);
});

// LOGOUT BLOOD BANK-
exports.logoutBloodBank = catchAsyncErr(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "You have been logged out of your account",
  });
});

// GENERATE TOKEN FOR FORGOT PASSWORD -
exports.forgotPassword = catchAsyncErr(async (req, res, next) => {
  const { email } = req.body;

  if (!email) {
    return next(new ErrorHandler("Please enter the email", 400));
  }

  const blood_bank = await bloodBankModel.findOne({ email });

  if (!blood_bank) {
    return next(new ErrorHandler("Blood bank not found", 404));
  }

  const resetToken = blood_bank.getResetPasswordToken();
  await blood_bank.save({ validateBeforeSave: false });

  const url = `${process.env.BASE_URL}/password/reset/${resetToken}`;

  try {
    await sendEmail({
      email: blood_bank.email,
      subject: "Blood Bridge password reset verification",
      message: `Click the given link to change your password: ${url}`,
    });

    res.status(200).json({
      success: true,
      message: `Email sent to ${blood_bank.email} successfully`,
    });
  } catch (err) {
    blood_bank.resetPasswordToken = undefined;
    blood_bank.resetPasswordExpire = undefined;
    await blood_bank.save({ validateBeforeSave: false });

    return next(new ErrorHandler(err.message, 500));
  }
});

// RESET PASSWORD -
exports.resetPassword = catchAsyncErr(async (req, res, next) => {
  const { password, confirmPassword } = req.body;
  const token = req.params.token;

  if (!password || !confirmPassword) {
    return next(
      new ErrorHandler("Please enter your password and confirm password", 400)
    );
  }

  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  const blood_bank = await bloodBankModel.findOne({
    resetPasswordToken,
    resetPasswordExpire: {
      $gt: Date.now(),
    },
  });

  if (!blood_bank) {
    return next(
      new ErrorHandler("Your password reset link is invalid or expired", 400)
    );
  }

  if (password !== confirmPassword) {
    return next(new ErrorHandler("Passwords don't match", 400));
  }

  blood_bank.password = req.body.password;
  blood_bank.resetPasswordToken = undefined;
  blood_bank.resetPasswordExpire = undefined;

  await blood_bank.save();
  res.status(200).json({
    success: true,
    message: "Your password has been changed",
  });
  // setToken(user, 200, res);
});