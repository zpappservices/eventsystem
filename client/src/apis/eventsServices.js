import apiHelper from "../helpers/apiHelper.js";

const getEvents = async (startLoading, stopLoading) => {
  return apiHelper(`event/getAllevent`, "get", null, startLoading, stopLoading);
};

const getEventsByCategory = async (id,startLoading, stopLoading) => {
  return apiHelper(
    `event/geteventbycategory/${id}`,
    "get",
    null,
    startLoading,
    stopLoading
  );
};

const getEventDetails = async (id, startLoading, stopLoading) => {
  return apiHelper(
    `event/getoneevent/${id}`,
    "get",
    null,
    startLoading,
    stopLoading
  );
};

const createEvent = async (data, startLoading, stopLoading) => {
  return apiHelper(
    `event/v2/createevent`,
    "post",
    data,
    startLoading,
    stopLoading
  );
};

const getVendorEvents = async (vendorid,startLoading, stopLoading) => {
  return apiHelper(
    `event/getallVendorEvents/${vendorid}`,
    "get",
    null,
    startLoading,
    stopLoading
  );
};

export {
  getEvents,
  getEventDetails,
  getEventsByCategory,
  createEvent,
  getVendorEvents,
};
