import apiHelper from "@/helpers/apiHelper";

const getVendorProfile = async (vendorid, startLoading, stopLoading) => {
  return apiHelper(
    `user/getvendorbyuserid/${vendorid}`,
    "get",
    null,
    startLoading,
    stopLoading
  );
};

const updateVendorProfile = async (id, data, startLoading, stopLoading) => {
  return apiHelper(
    `user/update-vendor/${id}`,
    "post",
    data,
    startLoading,
    stopLoading
  );
};

export { getVendorProfile, updateVendorProfile };
