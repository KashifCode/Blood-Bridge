export const BASE = "https://blood-bridge-umber.vercel.app/api/";
// export const BASE = "http://localhost:5000/api/";

export const registerUserUrl = () => {
  return encodeURI(`auth/user/register`);
};

export const loginUserUrl = () => {
  return encodeURI(`auth/user/login`);
};

export const logOutUserUrl = () => {
  return encodeURI(`auth/user/logout`);
};

export const getUserDetailsUrl = () => {
  return encodeURI(`user/me`);
};

export const userForgotPasswordUrl = () => {
  return encodeURI(`auth/user/forgot`);
};

export const userUpdateDetailsUrl = () => {
  return encodeURI(`user/me/update`);
};

export const userUpdatePasswordUrl = () => {
  return encodeURI(`user/password/update`);
};

export const getUserLocationUrl = () => {
  return encodeURI(`user/location`);
};

export const getAllBloodBanksUrl = () => {
  return encodeURI(`user/bloodBanks/all`);
};

export const getBloodBanksHome = () => {
  return encodeURI(`bloodBanks`);
};

export const registerBloodBankUrl = () => {
  return encodeURI(`auth/bloodBank/register`);
};

export const loginBloodBankUrl = () => {
  return encodeURI(`auth/bloodBank/login`);
};

export const bloodBankForgotPasswordUrl = () => {
  return encodeURI(`auth/bloodBank/forgot`);
};

export const getBloodBankDetailsUrl = () => {
  return encodeURI(`bloodBank/me`);
};

export const bloodBankUpdateDetailsUrl = () => {
  return encodeURI(`bloodBank/me/update`);
};

export const bloodBankUpdatePasswordUrl = () => {
  return encodeURI(`bloodBank/password/update`);
};

export const BBProfileCompleteUrl = () => {
  return encodeURI(`bloodBank/profileCompletion`);
};

export const deactivateBloodBankUrl = () => {
  return encodeURI(`bloodBank/deactivate`);
};

export const viewSpecificBloodBank = () => {
  return encodeURI(`user/bloodBank/`);
};

export const requestBloodUrl = () => {
  return encodeURI(`bloodBank/blood/request`);
};

export const getUserBloodRequests = () => {
  return encodeURI(`user/blood/request/all`);
};

export const getUserBloodDonations = () => {
  return encodeURI(`user/blood/donation/all`);
};

export const donateBloodUrl = () => {
  return encodeURI(`bloodBank/blood/donation`);
};

export const donateBloodManualUrl = () => {
  return encodeURI(`bloodBank/blood/manualDonation`);
};

export const addBloodGroup = () => {
  return encodeURI(`bloodBank/bloodType/new`);
};

export const updateBloodGroup = () => {
  return encodeURI(`bloodBank/bloodType/update`);
};

export const BBgetAllBloodRequestes = () => {
  return encodeURI(`bloodBank/blood/request/all`);
};

export const BBUpdateRequestStatus = () => {
  return encodeURI(`bloodBank/blood/request/`);
};

export const BBgetAllBloodDonations = () => {
  return encodeURI(`bloodBank/blood/donation/all`);
};

export const BBUpdateDonationStatus = () => {
  return encodeURI(`bloodBank/blood/donation/`);
};

export const BBgetAllBloodTypes = () => {
  return encodeURI(`bloodBank/bloodType/all`);
};

export const createNewEvent = () => {
  return encodeURI(`bloodBank/event/create`);
};

export const getAllEvents = () => {
  return encodeURI(`bloodBank/events/all`);
};

export const getAllUserEvents = () => {
  return encodeURI(`user/events/all`);
};

export const modifyEvent = () => {
  return encodeURI(`bloodBank/event/`);
};

export const eventNotifyUsers = () => {
  return encodeURI(`bloodBank/event/notify`);
};

export const getNearby = () => {
  return encodeURI(`bloodBanks/locate`);
};

export const placeRequestToUsers = () => {
  return encodeURI(`bloodBank/action`);
};

export const getAllRequestsToUsers = () => {
  return encodeURI(`bloodBanks/records`);
};

export const submitUserFeedback = () => {
  return encodeURI(`user/feedback`);
};

export const reviewBloodBank = () => {
  return encodeURI(`user/review/bloodBank`);
};

export const getReviewsBloodBank = () => {
  return encodeURI(`bloodBank/reviews`);
};

export const getReviewsHome = () => {
  return encodeURI(`user/feedbacks`);
};

export const getCurrentUserReviews = () => {
  return encodeURI(`user/reviews`);
};

export const admGetAllRequests = () => {
  return encodeURI(`admin/bloodBank/blood/requests`);
}

export const admGetAllDonations = () => {
  return encodeURI(`admin/bloodBank/blood/donations`);
}

export const admGetAllBloodBanks = () => {
  return encodeURI(`admin/bloodBank/all`);
}

export const admGetAllUsers = () => {
  return encodeURI(`admin/user/all`);
}

export const admUserActions = () => {
  return encodeURI(`admin/user/`);
}

export const admGetAllBloodTypes = () => {
  return encodeURI(`admin/bloodType/all`);
}

export const admBloodBankActions = () => {
  return encodeURI(`admin/bloodBank/`);
}

export const admVerifyBloodBank = () => {
  return encodeURI(`admin/bloodBank/verification/`);
}

export const admGetAllEvents = () => {
  return encodeURI(`admin/bloodBank/events/all`);
}