import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Typography, Button, Box, Link } from "@mui/material";
import { useBookingContext } from "@/context/booking";
import { useRouter } from "next/router";
import BookNowModal from "./BookNowModal";

import "bootstrap/dist/css/bootstrap.css"; // Add this line
import { Container, Row, Col, Table, Form, Pagination } from "react-bootstrap";

export default function FixedSizeGrid(props) {
  const [isBookNowOpen, setBookNowOpen] = useState(false);
  const router = useRouter();
  const [booking, setBooking] = useBookingContext();

  const handleBookNow = () => {
    router.push("/booking/select");
  };

  const handleBookNowOpen = (bookingItem) => {
    console.log(bookingItem);
    setBooking(bookingItem); //kiwi link booking
    setBookNowOpen(true);
  };

  const handleBookNowClose = () => {
    setBooking({});
    setBookNowOpen(false);
  };

  // const columns = [
  //   { field: "cityFrom", headerName: "From", width: 170 },
  //   { field: "cityTo", headerName: "To", width: 170 },
  //   { field: "airlines_name", headerName: "Airlines", width: 170 },
  //   {
  //     field: "utc_departure",
  //     headerName: "Departure",
  //     width: 250,
  //     valueGetter: (params) => {
  //       const utcDate = new Date(params.row.utc_departure);
  //       const localDate = new Date(
  //         utcDate.toLocaleString("en-US", { timeZone: "Asia/Manila" })
  //       );
  //       const formattedDate = localDate.toLocaleString("en-US", {
  //         timeZone: "Asia/Manila",
  //         dateStyle: "medium",
  //         timeStyle: "medium",
  //       });
  //       return formattedDate;
  //     },
  //   },
  //   {
  //     field: "utc_arrival",
  //     headerName: "Arrival",
  //     width: 250,
  //     valueGetter: (params) => {
  //       const utcDate = new Date(params.row.utc_arrival);
  //       const localDate = new Date(
  //         utcDate.toLocaleString("en-US", { timeZone: "Asia/Manila" })
  //       );
  //       const formattedDate = localDate.toLocaleString("en-US", {
  //         timeZone: "Asia/Manila",
  //         dateStyle: "medium",
  //         timeStyle: "medium",
  //       });
  //       return formattedDate;
  //     },
  //   },
  //   {
  //     field: "conversion",
  //     headerName: "Fare",
  //     width: 130,
  //     valueGetter: (params) => params.row.conversion,
  //   },
  //   {
  //     field: "action",
  //     width: 200,
  //     headerName: "Action",
  //     sortable: false,
  //     renderCell: (params) => {
  //       return (
  //         <Button onClick={() => handleBookNowOpen(params.row)}>
  //           Book now
  //         </Button>
  //       );
  //     },
  //   },
  // ];

  // const rows = [];
  // for (var i in props.dataFlightSearch) {
  //   const dataRow = props.dataFlightSearch[i];
  //   for (var i1 in dataRow) {
  //     const dataRow2 = dataRow[i1];
  //     rows.push({
  //       booking_token: dataRow2.booking_token,
  //       deep_link: dataRow2.deep_link,
  //       cityFrom: dataRow2.cityFrom,
  //       cityTo: dataRow2.cityTo,
  //       airlines_name: dataRow2.airlines_name,
  //       utc_departure: dataRow2.utc_departure,
  //       utc_arrival: dataRow2.utc_arrival,
  //       conversion: dataRow2.price.toLocaleString(undefined, {
  //         maximumFractionDigits: 2,
  //       }),
  //       deep_link: dataRow2.deep_link,
  //     });
  //   }
  // }

  // const columns = [
  //   { field: "cityFrom", headerName: "From", width: 170 },
  //   { field: "cityTo", headerName: "To", width: 170 },
  //   { field: "airlines_name", headerName: "Airlines", width: 170 },
  //   {
  //     field: "utc_departure",
  //     headerName: "Departure",
  //     width: 250,
  //     valueGetter: (params) => {
  //       const utcDate = new Date(params.row.utc_departure);
  //       const localDate = new Date(
  //         utcDate.toLocaleString("en-US", { timeZone: "Asia/Manila" })
  //       );
  //       const formattedDate = localDate.toLocaleString("en-US", {
  //         timeZone: "Asia/Manila",
  //         dateStyle: "medium",
  //         timeStyle: "medium",
  //       });
  //       return formattedDate;
  //     },
  //   },
  //   {
  //     field: "utc_arrival",
  //     headerName: "Arrival",
  //     width: 250,
  //     valueGetter: (params) => {
  //       const utcDate = new Date(params.row.utc_arrival);
  //       const localDate = new Date(
  //         utcDate.toLocaleString("en-US", { timeZone: "Asia/Manila" })
  //       );
  //       const formattedDate = localDate.toLocaleString("en-US", {
  //         timeZone: "Asia/Manila",
  //         dateStyle: "medium",
  //         timeStyle: "medium",
  //       });
  //       return formattedDate;
  //     },
  //   },
  //   {
  //     field: "conversion",
  //     headerName: "Fare",
  //     width: 130,
  //     valueGetter: (params) => params.row.conversion,
  //   },
  //   {
  //     field: "action",
  //     width: 200,
  //     headerName: "Action",
  //     sortable: false,
  //     renderCell: (params) => {
  //       return (
  //         <Button onClick={() => handleBookNowOpen(params.row)}>
  //           Book now
  //         </Button>
  //       );
  //     },
  //   },
  // ];

  // const rows = [];

  // for (var i in props.dataFlightSearch) {
  //   const dataRow = props.dataFlightSearch[i];
  //   for (var i1 in dataRow) {
  //     const dataRow2 = dataRow[i1];
  //     rows.push({
  //       booking_token: dataRow2.booking_token,
  //       deep_link: dataRow2.deep_link,
  //       cityFrom: dataRow2.cityFrom,
  //       cityTo: dataRow2.cityTo,
  //       airlines_name: dataRow2.airlines_name,
  //       utc_departure: dataRow2.utc_departure,
  //       utc_arrival: dataRow2.utc_arrival,
  //       conversion: dataRow2.price.toLocaleString(undefined, {
  //         maximumFractionDigits: 2,
  //       }),
  //       deep_link: dataRow2.deep_link,
  //     });
  //   }
  // }

  // test
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10; // Number of rows per page
  const totalItems = props.dataFlightSearch.length;
  const totalPages = Math.ceil(totalItems / pageSize);

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, totalItems);
  const currentData = props.dataFlightSearch.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "black",
          margin: "20px 0",
          padding: "10px",
          bgcolor: "rgba(37, 198, 218, 0.5)",
          paddingTop: 4,
        }}
      >
        <Typography variant="h3">
          Search Results
          {props.propsParentToResult === 21
            ? " - No Return"
            : props.propsParentToResult === 10
            ? " - Multi City"
            : props.propsParentToResult}
        </Typography>
      </Box>

      <Container className="d-flex flex-column align-items-center">
        <Form.Control type="date" />
        <Row>
          <Col>1 of 3</Col>
          <Col xs={6}>2 of 3 (wider)</Col>
          <Col>3 of 3</Col>
        </Row>
        <Row>
          <Col>1 of 3</Col>
          <Col xs={5}>2 of 3 (wider)</Col>
          <Col>3 of 3</Col>
        </Row>
        <Row>
          <Col>
            <Table responsive striped bordered hover>
              <thead>
                <tr>
                  <th>From</th>
                  <th>To</th>
                  <th>Airlines</th>
                  <th>Departure</th>
                  <th>Arrival</th>
                  <th>Fare</th>
                  <th>Action</th>
                </tr>
              </thead>
              {props.dataFlightSearch.length === 0 ? (
                <tbody>
                  <tr>
                    <td colSpan="7">No search results</td>
                  </tr>
                </tbody>
              ) : (
                <tbody>
                  {currentData.map((rowGroup, index) => (
                    <React.Fragment key={index}>
                      {rowGroup.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                          {/* <td>{row.booking_token}</td> */}
                          <td>{row.cityFrom}</td>
                          <td>{row.cityTo}</td>
                          <td>{row.airlines_code}</td>
                          <td>
                            {new Date(row.utc_departure).toLocaleString(
                              "en-US",
                              {
                                timeZone: "Asia/Manila",
                              }
                            )}
                          </td>
                          <td>
                            {new Date(row.utc_arrival).toLocaleString("en-US", {
                              timeZone: "Asia/Manila",
                            })}
                          </td>
                          <td>{row.price.toLocaleString()}</td>
                          <td>
                            <Button
                              onClick={() =>
                                handleBookNowOpen(row.booking_token)
                              }
                            >
                              Book now
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </React.Fragment>
                  ))}
                </tbody>
              )}
            </Table>
            {props.dataFlightSearch.length > 0 && (
              <Pagination className="d-flex justify-content-center">
                {/* Pagination content */}
              </Pagination>
            )}
          </Col>
        </Row>
      </Container>

      {/* Error Modal */}
      {isBookNowOpen && (
        <BookNowModal
          isOpen={isBookNowOpen}
          onClose={handleBookNowClose}
          bookingItem={booking}
          onBookNow={handleBookNow}
        />
      )}
    </>
  );
}
