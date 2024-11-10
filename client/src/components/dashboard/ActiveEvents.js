import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function createData(name, calories, fat, carbs, protein) {
   return { name, calories, fat, carbs, protein };
}

const rows = [
   createData("AY Live", "AY Live", 150000, 24, "11/06/2024"),
   createData("MC Pashun", "MC Pashun", 5000000, 7, "11/12/2024"),
];

const ActiveEvents = () => {
   return (
      <div className="w-full flex flex-col gap-10">
         <p className="text-[20px] font-bold leading-[24px]">
            Active Event Tickets
         </p>
         <div>
            <TableContainer component={Paper}>
               <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                     <TableRow>
                        <TableCell>Event Name</TableCell>
                        <TableCell align="center">Ticket Name</TableCell>
                        <TableCell align="center">Amount Earned</TableCell>
                        <TableCell align="center">
                           No of Tickets Bought
                        </TableCell>
                        <TableCell align="center">Date Purchased</TableCell>
                     </TableRow>
                  </TableHead>
                  <TableBody>
                     {rows.map((row) => (
                        <TableRow
                           key={row.name}
                           sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                           }}
                        >
                           <TableCell component="th" scope="row">
                              {row.name}
                           </TableCell>
                           <TableCell align="center">{row.calories}</TableCell>
                           <TableCell align="center"><span className="font-bold">$</span>{row.fat}</TableCell>
                           <TableCell align="center">{row.carbs}</TableCell>
                           <TableCell align="center">{row.protein}</TableCell>
                        </TableRow>
                     ))}
                  </TableBody>
               </Table>
            </TableContainer>
         </div>
      </div>
   );
};

export default ActiveEvents;