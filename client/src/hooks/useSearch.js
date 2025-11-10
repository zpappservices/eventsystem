import { useState, useEffect } from "react";

const useSearch = (items, searchTerm, searchFunction) => {
  const [searchedItems, setSearchedItems] = useState(items);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setSearchedItems(items);
    } else {
      setSearchedItems(
        items.filter((item) => searchFunction(item, searchTerm))
      );
    }
  }, [items, searchTerm]);

  return searchedItems;
};

export default useSearch;
