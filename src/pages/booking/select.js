import React, { useState, useEffect } from "react";
import Layout from "../../components/layout/Layout";

import { Grid, Container, Typography, Button } from "@mui/material";

import { useBookingContext } from "@/context/booking";
import { useRouter } from "next/router";

import BookingItem from "@/components/BookingItem";
import AppointmentModal from "../../components/AppointmentModal";

import ConnectingAirportsIcon from "@mui/icons-material/ConnectingAirports";

function SelectFlight() {
  const router = useRouter();

  const [booking] = useBookingContext();
  const [isModal, setIsModal] = useState(false);

  const createBookingAppointment = () => {
    setIsModal(true);
  };
  return (
    <Layout>
      <>
        <AppointmentModal
          isModal={isModal}
          router={router}
          booking={booking}
          setIsModal={setIsModal}
        />
      </>

      <Container
        sx={{
          mt: 10,
          position: "relative",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography color="inherit" fontSize={16}>
          Select your departing flight
        </Typography>
        <Container
          sx={{
            position: "relative",
            display: "flex",
            flexDirection: "row",
          }}
        >
          <Typography fontSize={32} fontWeight={600}>
            {booking.cityFrom}
          </Typography>
          <Typography
            fontSize={32}
            fontWeight={600}
            color={"#1976d2"}
            sx={{ mx: 5 }}
          >
            <ConnectingAirportsIcon />
          </Typography>

          <Typography color="inherit" fontSize={32} fontWeight={600}>
            {booking.cityTo}
          </Typography>
        </Container>

        <BookingItem booking={booking} />

        <Grid container spacing={5} justifyContent="flex-end" sx={{ mb: 10 }}>
          <Grid item>
            <Button
              color="primary"
              size="large"
              onClick={() => router.push("/")}
            >
              Cancel
            </Button>
          </Grid>

          <Grid item>
            <Button
              color="primary"
              size="large"
              variant="contained"
              onClick={createBookingAppointment}
            >
              Continue
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
}

export default SelectFlight;
