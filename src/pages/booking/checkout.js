import React, { useState, useEffect } from "react";
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
import { useRouter } from "next/router";
import { post_booking_payment } from "@/api/auth";
import BookingVerificationModal from "@/components/BookingVerificationModal";
import CreditCardDatePicker from "@/components/CreditCardDatePicker";
import Layout from "@/components/layout/Layout";

function SelectFlight() {
  const router = useRouter();

  const [creditCardNo, setCreditCardNo] = useState("");
  const [cvv, setCvv] = useState("");
  const [expiration, setExpiration] = useState(dayjs(new Date()));
  const [isModal, setIsModal] = useState(false);

  useEffect(() => {
    // Perform localStorage action
    const bookingUserInfo = localStorage.getItem("booking_user_info");
  }, []);

  const paymentSubmit = () => {
    post_booking_payment({
      credit_card_no: creditCardNo,
      cvv: cvv,
      expiration: expiration,
    })
      .then((val) => {
        window.localStorage.setItem("booking_payment_info", val.data.token);
        setIsModal(true);
      })
      .catch((e) => {
        alert(e.response.data.detail);
      });
  };

  const [expirationDate, setExpirationDate] = useState(null);

  const handleDateChange = (date) => {
    setExpirationDate(date);
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
          <Grid item xs={12} md={6} sx={{ mt: 3 }}>
            <CreditCardDatePicker
              required
              selectedDate={expirationDate}
              handleDateChange={handleDateChange}
              fullWidth
              variant="standard"
            />
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
