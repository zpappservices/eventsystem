const { default: apiHelper } = require("@/helpers/apiHelper");

const payForTicket = async (data, startLoading, stopLoading) => {
  return apiHelper(
    "payment/place-order",
    "post",
    data,
    startLoading,
    stopLoading
  );
};

const reserveSpot = async (data, startLoading, stopLoading) => {
  return apiHelper(
    "payment/reserve-spot",
    "post",
    data,
    startLoading,
    stopLoading
  );
};

export { payForTicket, reserveSpot };
