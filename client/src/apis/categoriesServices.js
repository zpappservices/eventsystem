import apiHelper from "@/helpers/apiHelper";

const getCategories = async (startLoading, stopLoading) => {
  return apiHelper(
    `setup/getallcategory`,
    "get",
    null,
    startLoading,
    stopLoading
  );
};

export { getCategories };
