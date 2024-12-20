import React, { useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import useAuthToken from "@/hooks/useAuthToken";
import useApiRequest from "@/hooks/useApiRequest";
import { convertTo12HourFormat, formatDate } from "@/utils/time";
import { useRouter } from "next/router";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("AY Live", "AY Live", 150000, 24, "11/06/2024"),
  createData("MC Pashun", "MC Pashun", 5000000, 7, "11/12/2024"),
];

const ActiveEvents = () => {
  const { activeUser } = useAuthToken();
  const router = useRouter();

  const { data, request } = useApiRequest({
    method: "get",
    url: `event/getallVendorEvents/${activeUser}`,
    data: null,
    headers: {},
    useToken: true,
  });

  const getUser = async () => {
    await request();
  };

  useEffect(() => {
    getUser();
  }, []);

  const { data: events } = data || {};

  const activeEvents = events?.filter((event) => event.active === true);
  return (
    <div className="w-full flex flex-col gap-10">
      <p className="text-[20px] !font-bold leading-[24px]">
        Active Event Tickets
      </p>
      <div>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell className="!font-bold">Event Name</TableCell>
                <TableCell align="center" className="!font-bold">
                  Category
                </TableCell>
                <TableCell align="center" className="!font-bold">
                  Date & Time
                </TableCell>
                <TableCell align="center" className="!font-bold">
                  Location
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {activeEvents?.map(
                ({ title, id, category, StartDate, StartTime, location }) => (
                  <TableRow
                    key={id}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                    }}
                    className="cursor-pointer"
                    onClick={() => router.push(`/dashboard/event/${id}`)}>
                    <TableCell
                      component="th"
                      scope="row"
                      className="text-ellipsis">
                      {title}
                    </TableCell>
                    <TableCell align="center">{category}</TableCell>
                    <TableCell align="center" className="w-[350px]">
                      {formatDate(StartDate)}{" "}
                      {convertTo12HourFormat(StartTime)}
                    </TableCell>
                    <TableCell align="center">{location}</TableCell>
                  </TableRow>
                )
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default ActiveEvents;
