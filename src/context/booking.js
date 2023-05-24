import { createContext, useContext, useState } from "react";

const Context = createContext();

export function BookingProvider({ children }) {
  const [booking, setBooking] = useState([]);
  return (
    <Context.Provider value={[booking, setBooking]}>{children}</Context.Provider>
  );
}

export function useBookingContext() {
  return useContext(Context);
}