import apiHelper from "../helpers/apiHelper.js";

const getEvents = async (startLoading, stopLoading) => {
  return apiHelper(`event/getAllevent`, "get", null, startLoading, stopLoading);
};

export { getEvents };
