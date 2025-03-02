import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import Stack from "@mui/material/Stack";

const CustomPagination = ({ count, handlePageChange }) => {
  return (
    <Stack spacing={2}>
      <Pagination
        count={count}
        showFirstButton
        showLastButton
        variant="outlined"
        shape="rounded"
        onChange={(_, page) => handlePageChange(page)}
        renderItem={(item) => (
          <PaginationItem
            {...item}
            components={{
              first: () => (
                <div className="text-[14px] px-2 font-outfit">First</div>
              ),
              last: () => (
                <div className="text-[14px] px-2 font-outfit">Last</div>
              ),
            }}
            slots={{
              previous: () => (
                <div className="text-[14px] px-2 font-outfit">Prev</div>
              ),
              next: () => (
                <div className="text-[14px] px-2 font-outfit">Next</div>
              ),
            }}
            sx={{
              "&.Mui-selected": {
                backgroundColor: "#000",
                color: "#17DEBC",
              },
              "&:not(.Mui-selected)": {
                backgroundColor: "#fff",
                color: "#000",
                borderColor: "#000",
                borderRadius: 1,
                "&:hover": {
                  backgroundColor: "#000",
                  color: "#17DEBC",
                },
              },
            }}
          />
        )}
      />
    </Stack>
  );
};

export default CustomPagination;
