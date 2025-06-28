import apiHelper from "../helpers/apiHelper.js";

const getOrganizers = async (startLoading, stopLoading) => {
  return apiHelper(
    `user/getallvendor`,
    "get",
    null,
    startLoading,
    stopLoading
  );
};

const verifyOrganizer = async (userId,startLoading, stopLoading) => {
  return apiHelper(
    `user/verify-vendor/${userId}`,
    "get",
    null,
    startLoading,
    stopLoading
  );
};

export { getOrganizers, verifyOrganizer };
