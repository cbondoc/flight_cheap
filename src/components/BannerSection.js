import React from "react";
import PropTypes from "prop-types";
import { Paper, Typography, Grid, Box, Button } from "@mui/material";
import Image from "next/image";

function BannerSection(props) {
  const { banner } = props;

  return (
    <Paper
      sx={{
        position: "relative",
        backgroundColor: "grey.800",
        color: "#fff",
        mb: 4,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "top",
        backgroundImage: `url(${banner.image})`,
      }}
    >
      {/* Increase the priority of the hero background image */}
      {
        <Image
          style={{ display: "none" }}
          src={banner.image}
          alt={banner.imageText}
        />
      }
      <Box
        sx={{
          position: "absolute",
          top: 0,
          bottom: 0,
          right: 0,
          left: 0,
          backgroundColor: "rgba(0,0,0,.3)",
        }}
      />
      <Grid container>
        <Grid item md={6}>
          <Box
            sx={{
              position: "relative",
              p: { xs: 3, md: 6 },
              pr: { md: 0 },
            }}
          >
            <Typography
              component="h1"
              variant="h2"
              color="inherit"
              fontWeight={600}
            >
              {banner.title}
            </Typography>
            <Typography variant="h5" color="inherit" paragraph>
              {banner.description}
            </Typography>
            <Button
              color="primary"
              size="large"
              variant="contained"
              component="a"
              href=""
              sx={{ mt: 8 }}
            >
              {banner.linkText}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
}

BannerSection.propTypes = {
  banner: PropTypes.shape({
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    imageText: PropTypes.string.isRequired,
    linkText: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
};

export default BannerSection;
