import * as React from "react";
import Layout from "../../components/layout/Layout";

import { Grid, Container, Typography, Box, Button } from "@mui/material";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Fab from "@mui/material/Fab";

import Image from "next/image";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

import AddHomeWorkIcon from "@mui/icons-material/AddHomeWork";
import AddLocationIcon from "@mui/icons-material/AddLocation";
import MailOutlineIcon from "@mui/icons-material/MailOutline";

const item = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  px: 5,
};

const number = {
  fontSize: 24,
  fontFamily: "default",
  color: "secondary.main",
  fontWeight: "medium",
};

const image = {
  height: 55,
  my: 4,
};

function ContactUs() {
  const ConcatImg = "/contact-img2.jpg";
  return (
    <Layout>
      <Box component="section" sx={{ display: "flex", overflow: "hidden" }}>
        <Container
          sx={{
            mt: 10,
            mb: 15,
            position: "relative",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box
            component="img"
            src="/productCurvyLines.png"
            alt="curvy lines"
            sx={{
              pointerEvents: "none",
              position: "absolute",
              top: -180,
              opacity: 0.7,
            }}
          />
          {/* <Typography
            variant="h4"
            marked="center"
            component="h2"
            sx={{ mb: 14 }}
          >
            Contact Us
          </Typography> */}
          <div>
            <Grid container spacing={2}>
              <Grid item md={8}>
                <Image
                  src={ConcatImg}
                  alt="Cheap Flight Contact Image"
                  width={"650"}
                  height={"650"}
                />
              </Grid>
              <Grid
                item
                md={4}
                sx={{
                  mt: 10,
                  mb: 5,
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Typography
                  variant="h2"
                  marked="center"
                  component="h2"
                  color="primary"
                >
                  Contact Us
                </Typography>
              </Grid>
            </Grid>
            <Grid container spacing={5}>
              <Grid item xs={12} md={4}>
                <Box sx={item}>
                  <Item sx={{ marginBottom: 1, boxShadow: "none" }}>
                    <Fab color="primary" aria-label="add">
                      <AddHomeWorkIcon />
                    </Fab>
                    <Typography variant="h5" gutterBottom sx={{ padding: 1 }}>
                      Phone
                    </Typography>
                  </Item>
                  <Typography variant="p" align="center">
                    +63 32 318 5780
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={4}>
                <Box sx={item}>
                  <Item sx={{ marginBottom: 1, boxShadow: "none" }}>
                    <Fab color="primary" aria-label="add">
                      <MailOutlineIcon />
                    </Fab>
                    <Typography variant="h5" gutterBottom sx={{ padding: 1 }}>
                      Email
                    </Typography>
                  </Item>
                  <Typography variant="p" align="center">
                    email@codev.com
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={4}>
                <Box sx={item}>
                  <Item sx={{ marginBottom: 1, boxShadow: "none" }}>
                    <Fab color="primary" aria-label="add">
                      <AddLocationIcon />
                    </Fab>
                    <Typography variant="h5" gutterBottom sx={{ padding: 1 }}>
                      Address
                    </Typography>
                  </Item>
                  <Typography variant="p" align="center">
                    {"7F, The Link, Cebu IT Park, Apas, Cebu City, Philippines"}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </div>
          <Button
            color="primary"
            size="large"
            variant="outlined"
            component="a"
            href=""
            sx={{ mt: 8 }}
          >
            Got any questions? Need help?
          </Button>
        </Container>
      </Box>
    </Layout>
  );
}

export default ContactUs;
