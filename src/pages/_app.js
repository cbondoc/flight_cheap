import React from "react";
import "@/styles/globals.css";
import { BookingProvider } from "@/context/booking";

export default function App({ Component, pageProps }) {
  return (
    <BookingProvider>
      <Component {...pageProps} />
    </BookingProvider>
  );
}
