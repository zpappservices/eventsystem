const { default: apiHelper } = require("@/helpers/apiHelper");

const getTransactions = async (data, startLoading, stopLoading) => {
  return apiHelper(
    `event/get-event-transactions`,
    "post",
    data,
    startLoading,
    stopLoading
  );
};

export { getTransactions };
