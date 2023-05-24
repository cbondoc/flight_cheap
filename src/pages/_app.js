import React from 'react';

import { BookingProvider } from '@/context/booking';


export default function App({ Component, pageProps }) {
  return (
    <BookingProvider>
      <Component {...pageProps} />
    </BookingProvider>
  );
}