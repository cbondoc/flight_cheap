import React, { useState, useEffect } from "react";
import moment from "moment";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import FlightLandIcon from "@mui/icons-material/FlightLand";
import ConnectingAirportsIcon from "@mui/icons-material/ConnectingAirports";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import LocalAirportIcon from "@mui/icons-material/LocalAirport";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import SellIcon from "@mui/icons-material/Sell";
import { Divider } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const BookNowModal = (props) => {
  const { isOpen, onClose, onBookNow, bookingItem } = props;
  const [expanded, setExpanded] = useState(false);

  const handleExpand = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const { allRoutes, data, price } = bookingItem;

  let [flight] = allRoutes;

  if (allRoutes.length > 1) {
    let lastFlight = allRoutes[allRoutes.length - 1];
    if (data === "single") {
      flight = { ...flight, cityTo: lastFlight.cityTo };
    }
    flight = { ...flight, utc_arrival: lastFlight.utc_arrival };
    console.log(lastFlight, "lastFlight");
  }

  useEffect(() => {
    if (allRoutes.length >= 1) {
      setExpanded(allRoutes[0].id);
    }
  }, [allRoutes]);

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style} component="form" noValidate autoComplete="off">
        <Grid container spacing={1} p={2} alignItems="center">
          <Grid item xs={4} flex={1}>
            <Typography fontSize={14}>
              <LocalAirportIcon sx={{ fontSize: 18 }} color="primary" />{" "}
              {flight.cityFrom} to {flight.cityTo}
            </Typography>
          </Grid>
          <Grid item xs={4} flex={1}>
            <Typography fontSize={14}>
              <CalendarMonthIcon sx={{ fontSize: 18 }} color="primary" />{" "}
              {moment(flight.local_departure).format("DD MMM YYYY")} -{" "}
              {moment(flight.utc_arrival).format("DD MMM YYYY")}
            </Typography>
          </Grid>
          <Grid item xs={4} flex={1}>
            <Typography fontSize={14}>
              <SellIcon sx={{ fontSize: 18 }} color="primary" /> {price}
            </Typography>
          </Grid>
        </Grid>
        <Divider />
        <div>
          {data === "multiple" ? (
            allRoutes.map(
              ({ id, cityFrom, cityTo, utc_departure, utc_arrival, route }) => (
                <Accordion
                  key={id}
                  expanded={expanded === id}
                  onChange={handleExpand(id)}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                  >
                    <Typography sx={{ width: "33%", flexShrink: 0 }}>
                      {cityFrom} - {cityTo}
                    </Typography>
                    <Typography sx={{ color: "text.secondary" }}>
                      {moment(utc_departure).format("MMM DD YYYY kk:mm")} -{" "}
                      {moment(utc_arrival).format("MMM DD YYYY")}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      <RouteItem route={route} fontSize={13} />
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              )
            )
          ) : (
            <RouteItem route={allRoutes} fontSize={14} />
          )}
        </div>

        {/* {allRoutes.map((routeItem) => <RouteItem bookingItem={routeItem} />)} */}

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

const RouteItem = ({ route, fontSize = 10 }) => {
  return (
    <>
      {route.map((routeItem) => {
        const mins = moment.utc(
          moment(routeItem.local_arrival).diff(
            moment(routeItem.local_departure)
          )
        );

        console.log(mins);

        console.log(routeItem);
        return (
          <Grid
            key={routeItem.id}
            container
            spacing={1}
            p={1}
            alignItems="center"
          >
            <Grid item xs={3}>
              <Typography fontWeight={600} fontSize={fontSize - 1}>
                {moment(routeItem.utc_departure).format("MMM DD YYYY kk:mm")}
              </Typography>
              <Typography fontSize={fontSize}>
                <FlightTakeoffIcon sx={{ fontSize }} color="primary" /> Depart -{" "}
                {routeItem.cityFrom}
              </Typography>
            </Grid>
            <Grid item xs={1}>
              <ConnectingAirportsIcon sx={{ fontSize: 20 }} color="primary" />
            </Grid>
            <Grid item xs={3}>
              <Typography
                color="inherit"
                fontWeight={600}
                fontSize={fontSize - 1}
              >
                {moment(routeItem.utc_arrival).format("MMM DD YYYY kk:mm")}
              </Typography>
              <Typography fontSize={fontSize}>
                <FlightLandIcon sx={{ fontSize }} color="primary" /> Arrive -{" "}
                {routeItem.cityTo}
              </Typography>
            </Grid>
            {/* <Grid item xs={1}>
        <Typography >
          {hours}h   {mins}m
        </Typography>
      </Grid> */}
            <Grid item xs={2}>
              <Typography fontSize={fontSize - 1} fontWeight={600}>
                {moment(routeItem.utc_arrival).format("MMM DD YYYY")}
              </Typography>
              <Typography fontSize={fontSize}>
                {/* {hours}h {mins}m */}
              </Typography>
            </Grid>
          </Grid>
        );
      })}
    </>
  );
};

BookNowModal.defaultProps = {
  isOpen: false,
  onClose: () => {},
  onBookNow: () => {},
  bookingItem: {},
};

export default BookNowModal;
