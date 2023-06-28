import React, { useState } from "react";
import ConnectingAirportsIcon from "@mui/icons-material/ConnectingAirports";
import { DataGrid } from "@mui/x-data-grid";
import { Typography, Button, Box, Divider, Paper } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { styled } from "@mui/material/styles";
import { useBookingContext } from "@/context/booking";
import { useRouter } from "next/router";
import BookNowModal from "@/components/BookNowModal";
import FlightRouteItem from "@/components/FlightRouteItem";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

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

  const columns = [
    {
      field: "deep_link",
      headerName: "Flight",
      minWidth: 400,
      renderCell: (params) => {
        const { route } = params.row;
        return (
          <>
            {route.map((routeItem, key) => (
              <>
                <FlightRouteItem routeItem={routeItem} />
                {route.length !== key + 1 ? (
                  <Divider orientation="vertical" flexItem>
                    <ConnectingAirportsIcon
                      sx={{ fontSize: 14 }}
                      color="primary"
                    />
                    <br />
                    <Typography
                      sx={{ fontSize: 9, m: 0, width: 30 }}
                      color="text.primary"
                    >
                      {params.row.stops > 0
                        ? `${params.row.stops} Stops `
                        : "Direct"}
                    </Typography>
                  </Divider>
                ) : (
                  <>{/* No output */}</>
                )}
              </>
            ))}
          </>
        );
      },
    },
    // { field: "cityTo", headerName: "To", width: 170 },
    // { field: "airlines_name", headerName: "Airlines", width: 170 },
    // {
    //   field: "utc_departure",
    //   headerName: "Departure",
    //   width: 250,
    //   valueGetter: (params) => {
    //     const utcDate = new Date(params.row.utc_departure);
    //     const localDate = new Date(
    //       utcDate.toLocaleString("en-US", { timeZone: "Asia/Manila" })
    //     );
    //     const formattedDate = localDate.toLocaleString("en-US", {
    //       timeZone: "Asia/Manila",
    //       dateStyle: "medium",
    //       timeStyle: "medium",
    //     });
    //     return formattedDate;
    //   },
    // },
    // {
    //   field: "utc_arrival",
    //   headerName: "Arrival",
    //   width: 250,
    //   valueGetter: (params) => {
    //     const utcDate = new Date(params.row.utc_arrival);
    //     const localDate = new Date(
    //       utcDate.toLocaleString("en-US", { timeZone: "Asia/Manila" })
    //     );
    //     const formattedDate = localDate.toLocaleString("en-US", {
    //       timeZone: "Asia/Manila",
    //       dateStyle: "medium",
    //       timeStyle: "medium",
    //     });
    //     return formattedDate;
    //   },
    // },
    {
      field: "price",
      headerName: "Fare",
      minWidth: 130,
      valueGetter: (params) => params.row.price,
    },
    {
      field: "action",
      minWidth: 200,
      headerName: "Action",
      sortable: false,
      renderCell: (params) => {
        // const onClick = (e) => {
        //   e.stopPropagation(); // avoid select this row after clicking
        //   setBooking(params.row);
        //   router.push("/booking/select");
        // };
        return (
          <Button onClick={() => handleBookNowOpen(params.row)}>
            Book now
          </Button>
        );
      },
    },
  ];

  const rows = [];
  console.log(props.dataFlightSearch);
  for (var i in props.dataFlightSearch) {
    const dataRow = props.dataFlightSearch[i];
    for (var i1 in dataRow) {
      const dataRow2 = dataRow[i1];
      rows.push({
        booking_token: dataRow2.booking_token,
        deep_link: dataRow2.deep_link,
        cityFrom: dataRow2.cityFrom,
        cityTo: dataRow2.cityTo,
        airlines_name: dataRow2.airlines_name,
        utc_departure: dataRow2.utc_departure,
        utc_arrival: dataRow2.utc_arrival,
        conversion: dataRow2.price.toLocaleString(undefined, {
          maximumFractionDigits: 2,
        }),
        deep_link: dataRow2.deep_link,
      });
    }
  }

  return (
    <>
      <Grid spacing={2}>
        <Grid md={8} mdOffset={2}>
          <Item>
            <Typography variant="h3">
              Search Results
              {props.propsParentToResult === 21
                ? " - No Return"
                : props.propsParentToResult === 10
                ? " - Multi City"
                : props.propsParentToResult}
            </Typography>
          </Item>
        </Grid>

        <Grid container md={8} mdOffset={2}>
          <Item>
            <DataGrid
              rowHeight={150}
              getRowId={(row) =>
                row.booking_token +
                "" +
                row.utc_arrival +
                "" +
                new Date().getTime()
              }
              columns={columns}
              rows={props.dataFlightSearch}
              pageSize={5}
              rowsPerPageOptions={[5]}
            />
          </Item>
        </Grid>
      </Grid>
      {/* <Box
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
      <div
        style={{
          width: "80%",
          margin: "50px auto",
          background: "white",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div style={{ height: 500, width: "100%" }}>
          <DataGrid
            rowHeight={150}
            className="centered"
            getRowId={(row) =>
              row.booking_token +
              "" +
              row.utc_arrival +
              "" +
              new Date().getTime()
            }
            columns={columns}
            rows={props.dataFlightSearch}
            pageSize={5}
            rowsPerPageOptions={[5]}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          />
        </div>
      </div> */}

      {/* Booking modal */}

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
