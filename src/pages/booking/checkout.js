import React, { useState, useEffect } from "react";
import Layout from "../../components/layout/Layout";

import {
  Grid,
  TextField,
  FormControlLabel,
  Checkbox,
  Container,
  Typography,
  Box,
  Button,
} from "@mui/material";

import dayjs from "dayjs";
// import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import { useBookingContext } from "@/context/booking";
import { useRouter } from "next/router";
import {
  post_booking_users,
  post_booking_payment,
  post_booking_final,
} from "@/api/auth";
import BookingItem from "@/components/BookingItem";

import BookingVerificationModal from "@/components/BookingVerificationModal";

function SelectFlight() {
  const router = useRouter();

  const [creditCardName, setCreditCardName] = useState("");
  const [creditCardNo, setCreditCardNo] = useState("");
  const [cvv, setCvv] = useState("");
  const [expiration, setExpiration] = useState(dayjs(new Date()));
  const [isModal, setIsModal] = useState(false);

  const bookingUserInfo = localStorage.getItem("booking_user_info");
  const paymentSubmit = () => {
    post_booking_payment({
      credit_card_no: creditCardNo,
      cvv: cvv,
      expiration: expiration,
    })
      .then((val) => {
        window.localStorage.setItem("booking_payment_info", val.data.token);
        //props.router.push('/bookings');
        setIsModal(true);
      })
      .catch((e) => {
        alert(e.response.data.detail);
      });
  };

  return (
    <Layout>
      <BookingVerificationModal
        isModal={isModal}
        router={router}
        setIsModal={setIsModal}
      />
      <Container
        sx={{
          pt: 15,
          position: "relative",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography variant="h6" gutterBottom>
          Payment method
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField
              required
              id="cardName"
              label="Name on card"
              fullWidth
              autoComplete="cc-name"
              variant="standard"
              onChange={(event) => setCreditCardName(event.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              required
              id="cardNumber"
              label="Card number"
              fullWidth
              autoComplete="cc-number"
              variant="standard"
              onChange={(event) => setCreditCardNo(event.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DatePicker', 'DatePicker']}>
            <DatePicker
              required
              views={['month', 'year']}
              id="expDate"
              label="Expiry date"
              value={expiration}
              variant="standard"
              onChange={(event)=>setExpiration(event.target.value)}
            />
            </DemoContainer>
          </LocalizationProvider> */}
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              required
              id="cvv"
              label="CVV"
              helperText="Last three digits on signature strip"
              fullWidth
              autoComplete="cc-csc"
              variant="standard"
              onChange={(event) => setCvv(event.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox color="secondary" name="saveCard" value="yes" />
              }
              label="Remember credit card details for next time"
            />
          </Grid>
        </Grid>

        <Grid container spacing={5} justifyContent="flex-end" sx={{ mb: 10 }}>
          <Grid item>
            <Button
              color="primary"
              size="large"
              onClick={() => router.push("/booking/select")}
            >
              Back
            </Button>
          </Grid>

          <Grid item>
            <Button
              color="primary"
              size="large"
              variant="contained"
              onClick={paymentSubmit}
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
