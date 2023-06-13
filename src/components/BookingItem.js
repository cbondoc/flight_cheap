import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import ConnectingAirportsIcon from "@mui/icons-material/ConnectingAirports";
import FlightLandIcon from "@mui/icons-material/FlightLand";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import { Container, Grid, Typography } from "@mui/material";
import moment from "moment";
import { useState } from "react";

function BookingItem({ booking }) {
  const [mins] = useState(
    moment
      .utc(moment(booking.utc_arrival).diff(moment(booking.utc_departure)))
      .format("mm")
  );

  const [hours] = useState(
    moment(booking.utc_arrival).diff(moment(booking.utc_departure), "hours")
  );

  return (
    <Container sx={{ mb: 5 }}>
      <Container
        sx={{
          my: 3,
          py: 2.5,
          borderRadius: 5,
          borderTop: 7,
          borderTopColor: "#1976d2",
          cursor: "pointer",
          boxShadow: 1,
        }}
      >
        {booking.status && (
          <Grid sx={{ mb: 2 }}>
            <Typography
              fontSize={12}
              fontWeight={600}
              color={booking.status === "Confirmed" ? "#5cab4c" : "red"}
            >
              {booking.status === "Confirmed" ? (
                <CheckCircleOutlineOutlinedIcon sx={{ fontSize: 16 }} />
              ) : (
                <CancelOutlinedIcon sx={{ fontSize: 16 }} />
              )}
              {booking.status}
            </Typography>
            <Typography fontSize={12}>
              Booked on: {moment(booking.utc_arrival).format("DD MMM YYYY")}
            </Typography>
          </Grid>
        )}
        <Grid container spacing={1}>
          <Grid item xs={2}>
            <Typography fontWeight={600}>
              {moment(booking.utc_departure).format("HH:mm A")}
            </Typography>
            <Typography fontSize={12}>
              <FlightTakeoffIcon sx={{ fontSize: 12 }} color="primary" /> Depart
              - {booking.cityFrom}
            </Typography>
          </Grid>
          <Grid item xs={1}>
            <ConnectingAirportsIcon sx={{ fontSize: 32 }} color="primary" />
          </Grid>
          <Grid item xs={2}>
            <Typography color="inherit" fontWeight={600}>
              {moment(booking.utc_arrival).format("HH:mm A")}
            </Typography>
            <Typography fontSize={12}>
              <FlightLandIcon sx={{ fontSize: 12 }} color="primary" /> Arrive -{" "}
              {booking.cityTo}
            </Typography>
          </Grid>
          <Grid item xs={1}>
            <Typography>
              {hours}h {mins}m
            </Typography>
          </Grid>
          <Grid item xs={2}>
            {/* <Typography>{booking.booking_token.slice(0, 5)}</Typography> */}
          </Grid>
          <Grid item xs={2}>
            <Typography>
              {moment(booking.utc_arrival).format("DD MMM YYYY")}
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography fontSize={18} color="#1976d2" fontWeight={600}>
              PHP {booking.conversion.PHP}
            </Typography>
          </Grid>
        </Grid>
      </Container>
      <Grid container spacing={2} sx={{ ml: 3 }}>
        <Typography fontSize={12} sx={{ mr: 1 }}>
          Flight operated by:
        </Typography>
        <Typography fontSize={12} fontWeight={600}>
          {booking.airlines_name}
        </Typography>
      </Grid>
    </Container>
  );
}

export default BookingItem;
