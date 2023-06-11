import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const BookingTokenTable = ({ bookingData }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>URL</TableCell>
            <TableCell>Price</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {bookingData.map((item, index) => (
            <TableRow key={index}>
              <TableCell>
                <a
                  href={
                    "https://www.kiwi.com/en/booking?token=" +
                    item.booking_token
                  }
                  target="_blank"
                >
                  Visit Kiwi
                </a>
              </TableCell>
              <TableCell>Price: {item.price}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default BookingTokenTable;
