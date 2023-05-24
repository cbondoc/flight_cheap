import Layout from '../../components/layout/Layout'
import React, { useState,useEffect } from 'react';
import {login} from '../../api/auth';

import {
  Container,
  Grid,
  TextField,
  Button
} from "@mui/material";

export default function Logout() {
  useEffect(() => {
    window.sessionStorage.clear();

  });

  return (
    <>
      <Layout type="auth">
        <Container>
          <Grid>
              You are now logout
          </Grid>
        </Container>
      </Layout>
    </>
  );
}
