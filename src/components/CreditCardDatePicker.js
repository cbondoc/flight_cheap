import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CreditCardDatePicker = ({ selectedDate, handleDateChange }) => {
  return (
    <DatePicker
      selected={selectedDate}
      onChange={handleDateChange}
      dateFormat="MM/yyyy"
      showMonthYearPicker
      showFullMonthYearPicker
      minDate={new Date()}
      placeholderText="MM/YYYY"
      className="form-control" // Use your own custom class for styling
    />
  );
};

export default CreditCardDatePicker;
