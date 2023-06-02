import Layout from "../../components/layout/Layout";
import React, { useState } from "react";
import { login } from "../../api/auth";
import Router from "next/router";

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
  function submit() {
    login(username, password)
      .then((res, req) => {
        sessionStorage.setItem("token", res.data.token);
        Router.push("/");
      })
      .catch((e) => {
        alert(e.response.data.detail);
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
    </Layout>
  );
}
