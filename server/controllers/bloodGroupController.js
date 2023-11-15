// IMPORTS -
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErr = require("../middlewares/catchAsyncErr");
const bloodGroupModel = require("../models/BloodGroupModel");

// CREATE BLOOD TYPE -
exports.createBloodType = catchAsyncErr(async (req, res, next) => {
  const { bloodGroup, stock } = req.body;
  const bloodBank = req.authUser.id;

  await bloodGroupModel.create({
    bloodGroup,
    stock,
    bloodBank,
  });

  res.status(201).json({
    success: true,
    message: "Blood type has been created",
  });
});

// GET ALL BLOOD TYPES -
exports.getAllBloodTypes = catchAsyncErr(async (req, res) => {
  const bloodType = await bloodGroupModel.find({
    bloodBank: req.authUser.id,
  });

  res.status(201).json({
    success: true,
    bloodType,
  });
});

// UPDATE BLOOD TYPE -
exports.updateBloodType = catchAsyncErr(async (req, res, next) => {
  const { bloodGroup } = req.body;

  const getBloodType = await bloodGroupModel.findOne({
    bloodGroup,
    bloodBank: req.authUser.id,
  });

  if (!getBloodType) {
    return next(new ErrorHandler(`Blood type does not exist`, 400));
  }

  getBloodType.stock = req.body.stock;
  await getBloodType.save();

  res.status(200).json({
    success: true,
    message: "Blood type has been updated",
    getBloodType,
  });
});

// REMOVE BLOOD TYPE -
exports.removeBloodType = catchAsyncErr(async (req, res, next) => {
  const { bloodGroup } = req.body;

  const getBloodType = await bloodGroupModel.findOne({
    bloodGroup,
    bloodBank: req.authUser.id,
  });

  if (!getBloodType) {
    return next(new ErrorHandler(`Blood type does not exist`, 400));
  }

  await getBloodType.deleteOne();

  res.status(200).json({
    success: true,
    message: "Blood type has been removed",
  });
});