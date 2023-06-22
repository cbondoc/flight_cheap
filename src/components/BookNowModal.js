import React, { useState } from "react";
import moment from "moment";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import FlightLandIcon from "@mui/icons-material/FlightLand";
import ConnectingAirportsIcon from "@mui/icons-material/ConnectingAirports";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const BookNowModal = (props) => {
  const { isOpen, onClose, onBookNow, bookingItem } = props;
  const mins = moment
    .utc(
      moment(bookingItem.utc_arrival).diff(moment(bookingItem.utc_departure))
    )
    .format("mm");
  const hours = moment(bookingItem.utc_arrival).diff(
    moment(bookingItem.utc_departure),
    "hours"
  );

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style} component="form" noValidate autoComplete="off">
        <Grid container spacing={1}>
          <Grid item xs={3}>
            <Typography fontWeight={600}>
              {moment(bookingItem.utc_departure).format("HH:mm A")}
            </Typography>
            <Typography fontSize={12}>
              <FlightTakeoffIcon sx={{ fontSize: 12 }} color="primary" /> Depart
              - {bookingItem.cityFrom}
            </Typography>
          </Grid>
          <Grid item xs={1}>
            <ConnectingAirportsIcon sx={{ fontSize: 32 }} color="primary" />
          </Grid>
          <Grid item xs={3}>
            <Typography color="inherit" fontWeight={600}>
              {moment(bookingItem.utc_arrival).format("HH:mm A")}
            </Typography>
            <Typography fontSize={12}>
              <FlightLandIcon sx={{ fontSize: 12 }} color="primary" /> Arrive -{" "}
              {bookingItem.cityTo}
            </Typography>
          </Grid>
          <Grid item xs={1}>
            <Typography>
              {hours}h {mins}m
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography>
              {moment(bookingItem.utc_arrival).format("DD MMM YYYY")}
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography fontSize={18} color="#1976d2" fontWeight={600}>
              PHP {bookingItem.conversion}
            </Typography>
          </Grid>
        </Grid>
        <Button
          color="primary"
          size="large"
          variant="contained"
          component="a"
          sx={{
            mt: 5,
            display: "block",
            marginLeft: "auto",
            marginRight: "auto",
            textAlign: "center",
          }}
          onClick={onBookNow}
        >
          Book Now
        </Button>
        <Button
          color="success"
          size="large"
          variant="contained"
          component="a"
          sx={{
            mt: 1,
            display: "block",
            marginLeft: "auto",
            marginRight: "auto",
            textAlign: "center",
          }}
          onClick={() =>
            window.open(
              `https://www.kiwi.com/en/booking?token=${bookingItem.booking_token}`,
              "_blank"
            )
          }
        >
          Visit Kiwi
        </Button>
      </Box>
    </Modal>
  );
};

BookNowModal.defaultProps = {
  isOpen: false,
  onClose: () => {},
  onBookNow: () => {},
  bookingItem: {},
};

export default BookNowModal;
