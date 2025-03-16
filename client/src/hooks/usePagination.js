import { useState, useEffect } from "react";

const usePagination = (data, itemsPerPage = 7) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPaginationPages, setTotalPaginationPages] = useState(0);
  const [paginatedData, setPaginatedData] = useState([]);

  useEffect(() => {
    if (!Array.isArray(data)) {
      console.warn("usePagination: data is not an array", data);
      setPaginatedData([]); 
      return;
    }

    const totalPages = Math.ceil(data?.length / itemsPerPage);
    setTotalPaginationPages(totalPages);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, data?.length);
    setPaginatedData(data?.slice(startIndex, endIndex));
  }, [data, currentPage, itemsPerPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * itemsPerPage + 1;
  const endIndex = Math.min(currentPage * itemsPerPage, data?.length);

  return {
    currentPage,
    totalPaginationPages,
    paginatedData,
    handlePageChange,
    startIndex,
    endIndex,
  };
};

export default usePagination;
