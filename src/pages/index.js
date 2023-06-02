import React, { useState } from "react";
import Layout from "../components/layout/Layout";
import BannerSection from "../components/BannerSection";
import SearchForm from "../components/SearchForm";
import SearchResults from "../components/SearchResults";

import { Box } from "@mui/material";

import Image from "next/image";

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

var settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};

export default function Dashboard() {
  const [dataFlightSearch, setDataFlightSearch] = useState([]);

  return (
    <>
      <Layout type="auth">
        <Box
          sx={{
            position: "relative",
            backgroundColor: "grey.800",
            color: "#fff",
            mb: 4,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundImage: `url(/banner2.jpg)`,
          }}
        >
          {/* <BannerSection banner={BannerSectionDetails} /> */}
          <Carousel
            showArrows={false}
            showIndicators={false}
            showStatus={false}
            showThumbs={false}
            interval={2000}
            autoPlay={true}
            infiniteLoop={true}
            stopOnHover={false}
          >
            <div style={{ width: "100%", height: 800 }}>
              <Image src="/banner/1.jpeg" alt="1" fill={true} />
            </div>
            <div style={{ width: "100%", height: 800 }}>
              <Image src="/banner/3.jpeg" alt="3" fill={true} />
            </div>
            <div style={{ width: "100%", height: 800 }}>
              <Image src="/banner/4.jpeg" alt="4" fill={true} />
            </div>
            <div style={{ width: "100%", height: 800 }}>
              <Image src="/banner/5.jpeg" alt="5" fill={true} />
            </div>
          </Carousel>

          <SearchForm setDataFlightSearch={setDataFlightSearch} />
          <SearchResults dataFlightSearch={dataFlightSearch} />
          <div style={{ width: "100%", height: "100px" }}></div>
        </Box>
      </Layout>
    </>
  );
}
