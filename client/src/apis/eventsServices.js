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

export { getEvents, getEventDetails, getEventsByCategory };
