import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import FormHelperText from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import EmailIcon from "@mui/icons-material/Email";
import { Container, Grid, Card } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

import { subscribe_email, subscribe_sms } from "@/api/auth";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function NotificationModal() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setEmail("");
    setPhone("");
    setStatus(false);
    setOpen(false);
  };

  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [phoneError, setPhoneError] = useState(null);
  const [error, setError] = useState(null);
  const [isSuccess, setStatus] = useState(false);
  const [isFetching, setLoading] = useState(false);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  useEffect(() => {
    validatePhone();
  }, [phone]);

  useEffect(() => {
    validateEmail();
  }, [email]);

  const validatePhone = () => {
    if (phone?.length < 5) {
      setPhoneError(true);
    } else {
      setPhoneError(false);
    }
  };

  const validateEmail = () => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!emailRegex.test(email)) {
      setError(true);
    } else {
      setError(false);
    }
  };

  const handleButtonClick = async () => {
    if (isSuccess) return handleClose();

    setLoading(true);

    const smsAPI = subscribe_sms({
      body: "Thank you for subscribing to our cheapest flight!",
    });

    const emailAPI = subscribe_email({
      to_email: email,
      subject: "✈️ Cheapest Flight Subscription: Activated ✈️",
      html_content: `Dear Franceley,<br><br>
     
      We are thrilled to welcome you to our platform! 🎉<br><br>
      
      By subscribing to our service, you can expect to receive the cheapest flight offers available. ✈️<br><br>
      
      We are dedicated to providing you with the best deals and helping you save money on your travels. Keep an eye on your inbox for our exclusive offers and promotions.<br><br>
      
      Thank you for choosing us and we look forward to serving you.<br><br>
      
      Best regards,<br>
      FlightCheap<br>
      Cheapest flight fare finder`,
    });

    Promise.all([emailAPI, smsAPI])
      .then((response) => {
        setStatus(true);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setLoading(false));
  };
  let formRender = "";
  let spinner = false;
  if (isFetching) {
    spinner = (
      <CircularProgress
        color="inherit"
        sx={{ height: "25px !important", width: "25px !important", ml: 1 }}
      />
    );
  }
  if (!isSuccess) {
    formRender = (
      <div style={{ width: "100%" }}>
        <Typography sx={{ mt: 2, mb: 1 }} component="label">
          SMS
        </Typography>
        <PhoneInput
          placeholder="SMS"
          country={"ph"}
          value={phone}
          onChange={(phone) => setPhone(phone)}
          containerStyle={{ width: "100%" }}
        />

        <TextField
          sx={{ mt: 4, width: "100%" }}
          id="input-with-icon-textfield"
          label="Email Address"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <EmailIcon />
              </InputAdornment>
            ),
          }}
          value={email}
          onChange={handleEmailChange}
          variant="standard"
        />
      </div>
    );
  } else {
    formRender = `Congratulations! You have successfully subscribed to our Cheap Flight Deals.`;
  }

  return (
    <>
      <Box component="section" sx={{ display: "flex", overflow: "hidden" }}>
        <Container>
          <Button
            color="info"
            size="large"
            variant="contained"
            component="a"
            onClick={handleOpen}
            fullWidth
          >
            Get Notified
          </Button>
        </Container>
      </Box>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} component="form" noValidate autoComplete="off">
          <Typography
            sx={{ textAlign: "center" }}
            id="modal-modal-title"
            variant="h6"
            component="h2"
          >
            Get latest deals!
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2, mb: 2 }}>
            Fly high, pay low with our unbeatable flight deals. Subscribe now!
          </Typography>

          {formRender}

          <Button
            disabled={error || phoneError}
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
            onClick={handleButtonClick}
          >
            {isSuccess ? "Done" : "Get Notified"}
            {spinner}
          </Button>

          <Typography sx={{ mt: 2, mb: 1, textAlign: "center", color: "gray" }}>
            We&apos;ll never share your email/number.
          </Typography>
        </Box>
      </Modal>
    </>
  );
}

export default NotificationModal;
