import Layout from "../../components/layout/Layout";
import React, { useState } from "react";
import { login } from "../../api/auth";
import Router from "next/router";
import ErrorModal from "../../components/ErrorModal";

import {
  Container,
  Grid,
  TextField,
  Button,
  Typography,
  Box,
  Divider,
  Paper,
} from "@mui/material";

export default function Login() {
  // Error Modal Trigger
  const [openModal, setOpenModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  function submit() {
    login(username, password)
      .then((res, req) => {
        sessionStorage.setItem("token", res.data.token);
        Router.push("/");
      })
      .catch((error) => {
        // alert(e.response.data.detail);
        console.log("ERROR");

        if (error.response && error.response.status === 403) {
          setErrorMessage("Incorrect username / password");
          handleOpenModal();
        } else {
          // Handle other types of errors
          setErrorMessage("Error on API endpoint");
          handleOpenModal();
        }
      });
  }

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <Layout type="auth">
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "calc(110vh - 120px)",
          backgroundImage: "url('/airplane-background.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Paper sx={{ p: 4, minWidth: "400px", opacity: 0.9 }}>
          <Typography variant="h4" sx={{ textAlign: "center", mb: 2 }}>
            Log In to Your Account
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="username"
                label="Email Address"
                variant="outlined"
                onChange={(evt) => setUsername(evt.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="password"
                label="Password"
                variant="outlined"
                type="password"
                onChange={(evt) => setPassword(evt.target.value)}
              />
            </Grid>
          </Grid>
          <Button variant="contained" fullWidth sx={{ mt: 3 }} onClick={submit}>
            Log In
          </Button>
          <Divider sx={{ mt: 3, mb: 2 }}>Or</Divider>
          <Button
            variant="contained"
            color="secondary"
            fullWidth
            sx={{ mb: 2 }}
          >
            Create an Account
          </Button>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ textAlign: "center" }}
          >
            Forgot password?
          </Typography>
        </Paper>
      </Box>
      <ErrorModal
        open={openModal}
        onClose={handleCloseModal}
        errorMessage={errorMessage}
      />
    </Layout>
  );
}
