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

import {
  post_booking_users,
  post_booking_payment,
  post_booking_final,
} from "@/api/auth";

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

function AppointmentModal(props) {
  const handleClose = () => {
    setEmail("");
    setPhone("");
    props.setIsModal(false);
  };

  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState(null);
  const [isFetching, setLoading] = useState(false);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  useEffect(() => {
    validateEmail();
  }, [email]);

  const validateEmail = () => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!emailRegex.test(email)) {
      setError(true);
    } else {
      setError(false);
    }
  };

  const handleButtonClick = () => {
    setLoading(true);
    post_booking_users({
      user: [
        {
          first_name: firstName,
          last_name: middleName,
          middle_name: lastName,
        },
      ],
      booking_token: props.booking.booking_token,
      book_details: {
        from_city_code: props.booking.cityFrom,
        to_city_code: props.booking.cityTo,
        from_time: props.booking.utc_arrival,
        to_time: props.booking.utc_departure,
      },
    })
      .then((val) => {
        setLoading(false);
        window.localStorage.setItem("booking_user_info", val.data.token);
        props.router.push("/booking/checkout");
      })
      .catch((e) => {
        alert(e.response.data.detail);
      });
    console.log(props.booking);
  };
  let spinner = false;
  if (isFetching) {
    spinner = (
      <CircularProgress
        color="inherit"
        sx={{ height: "25px !important", width: "25px !important", ml: 1 }}
      />
    );
  }

  return (
    <>
      <Modal
        open={props.isModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} component="form" noValidate autoComplete="off">
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Get latest deals!
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2, mb: 2 }}>
            Fly high, pay low with our unbeatable flight deals. Subscribe now!
          </Typography>
          <Box>
            <TextField
              sx={{ mt: 4, width: "90%" }}
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
            <TextField
              sx={{ mt: 4, width: "90%" }}
              id="input-with-icon-textfield"
              label="First Name"
              value={firstName}
              onChange={(event) => setFirstName(event.target.value)}
              variant="standard"
            />
            <TextField
              sx={{ mt: 4, width: "90%" }}
              id="input-with-icon-textfield"
              label="Middle Name"
              value={middleName}
              onChange={(event) => setMiddleName(event.target.value)}
              variant="standard"
            />
            <TextField
              sx={{ mt: 4, width: "90%" }}
              id="input-with-icon-textfield"
              label="Last Name"
              value={lastName}
              onChange={(event) => setLastName(event.target.value)}
              variant="standard"
            />
          </Box>

          <Button
            color="primary"
            size="large"
            variant="contained"
            component="a"
            sx={{ mt: 5 }}
            onClick={handleButtonClick}
          >
            Submit your information
          </Button>
          <FormHelperText sx={{ mt: 2 }} id="my-helper-text">
            We&apos;ll never share your email/number.
          </FormHelperText>
        </Box>
      </Modal>
    </>
  );
}

export default AppointmentModal;
