const useFilter = (items, filterFunction) => {
  return Array.isArray(items) ? items.filter(filterFunction) : [];
};

export default useFilter;
