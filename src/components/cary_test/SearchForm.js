import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Card,
  TextField,
  Autocomplete,
  Paper,
} from "@mui/material";

import { DateRangePicker } from "react-date-range";
import Modal from "@/components/Modal";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import ErrorModal from "@/components/ErrorModal";
import Grid from "@mui/material/Unstable_Grid2";
import { styled } from "@mui/material/styles";

// test date range picker
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import DatePicker from "react-modern-calendar-datepicker";
import { Calendar, utils } from "react-modern-calendar-datepicker";

import {
  get_iata,
  get_search_flights_single,
  get_search_flights_multiple,
  get_airline_code,
} from "@/api/auth";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function SearchForm(props) {
  const [iataDataFrom, setIataDataFrom] = useState([]);
  const [iataDataTo, setIataDataTo] = useState([]);
  const [airlineData, setAirlineData] = useState({});
  const [fromValue, setFromValue] = useState(null);
  const [toValue, setToValue] = useState(null);
  const [trip, setTrip] = useState(10);

  // Error Modal Trigger
  const [openModal, setOpenModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  // Added filter options to include top level category in search result
  const filterOptions = (options, state) => {
    let newOptions = [];
    options.forEach((element) => {
      if (
        element.Country.replace(",", "")
          .toLowerCase()
          .includes(state.inputValue.toLowerCase()) ||
        element.CITY.replace(",", "")
          .toLowerCase()
          .includes(state.inputValue.toLowerCase())
      )
        newOptions.push(element);
    });
    return newOptions;
  };

  useEffect(() => {
    // Get Airline IATA Code
    get_iata()
      .then((res) => {
        setIataDataFrom(res.data);
      })
      .catch((error) => {
        console.error(error);
      });

    // Get Airline Code
    get_airline_code()
      .then((res) => {
        const data = {};
        for (const i in res.data) {
          const res_data = res.data[i];
          data[res_data.code] = res_data.name;
        }
        setAirlineData(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  // Date Range Picker
  const [selectedDayRange, setSelectedDayRange] = useState({
    from: null,
    to: null,
  });

  // Search Flight Button
  const handleButtonClick = async () => {
    if (!fromValue || !fromValue.IATA_CODE) {
      // handle error when textbox is empty
      setErrorMessage("Please enter the departure place in the 'From' field.");
      handleOpenModal();
      return;
    }
    if (!toValue || !toValue.IATA_CODE) {
      // handle error when textbox is empty
      setErrorMessage("Please enter the arrival place in the 'To' field.");
      handleOpenModal();
      return;
    }
    console.log("From: " + JSON.stringify(fromValue.IATA_CODE));
    console.log("To: " + JSON.stringify(toValue.IATA_CODE));
    props.setDataFlightSearch([]);

    if (dateRange) {
      const { startDate, endDate } = dateRange[0];
      console.log(
        `Selected date range: ${startDate.toLocaleDateString(
          "en-GB"
        )} - ${endDate.toLocaleDateString("en-GB")}`
      );

      let dataSearchFlights = [];

      // Flight Search - Single (No return)
      if (trip === 10) {
        dataSearchFlights = [
          {
            from_city_code: fromValue.IATA_CODE,
            to_city_code: toValue.IATA_CODE,
            from_time: startDate.toLocaleDateString("en-GB"),
            to_time: endDate.toLocaleDateString("en-GB"),
          },
          {
            from_city_code: toValue.IATA_CODE,
            to_city_code: fromValue.IATA_CODE,
            from_time: startDate.toLocaleDateString("en-GB"),
            to_time: endDate.toLocaleDateString("en-GB"),
          },
        ];

        // Flight Search - Multiple (Multi City)
        get_search_flights_multiple(dataSearchFlights)
          .then(async (res, req) => {
            const row_data = await res.data.map((res_data) => {
              const routes = res_data.route.map((route) => {
                return route.airline
                  ? { ...route, airline_name: airlineData[route.airline] }
                  : {
                      ...route,
                      airline_name:
                        airlineData[route.airlines[route.airlines.length - 1]],
                    };
              });

              let shownRoutes = [routes[0]];

              if (routes.length > 1) {
                shownRoutes = [...shownRoutes, routes[routes.length - 1]];
              }

              return {
                baglimit: res_data.baglimit,
                booking_token: res_data.booking_token,
                deep_link: res_data.deep_link,
                price: res_data.price,
                quality: res_data.quality,
                route: shownRoutes,
                allRoutes: routes,
                stops: res_data.route.length - 2,
              };
              // return res_data.route.map((res_data1) => {
              //   console.log(res_data1["airlines"], 'airlines')
              //   return {
              //     baglimit: res_data.baglimit,
              //     booking_token: res_data.booking_token,
              //     deep_link: res_data.deep_link,
              //     price: res_data.price,
              //     quality: res_data.quality,
              //     // TODO
              //     airlines_code: res_data1["airlines"],
              //     airlines_name: airlineData[res_data1["airlines"]],
              //     cityFrom: res_data1["cityFrom"],
              //     cityTo: res_data1["cityTo"],
              //     conversion: res_data1["conversion"],
              //     fare: res_data1["fare"],
              //     facilitated_booking_available:
              //       res_data1["facilitated_booking_available"],
              //     utc_arrival: res_data1["utc_arrival"],
              //     utc_departure: res_data1["utc_departure"],
              //   };
              // });
            });
            console.log(row_data);
            props.setDataFlightSearch(row_data);
          })
          .catch((e) => {
            console.log("Error:" + e);
          });
      }

      // Booking options
      if (trip === 21) {
        dataSearchFlights = {
          from_city_code: fromValue.IATA_CODE,
          to_city_code: toValue.IATA_CODE,
          from_time: startDate.toLocaleDateString("en-GB"),
          to_time: endDate.toLocaleDateString("en-GB"),
        };
        console.log("okay");
        get_search_flights_single(dataSearchFlights)
          .then(async (res, req) => {
            const row_data = await res.data.data.map((res_data) => {
              const routes = res_data.route.map((route) => {
                return route.airline
                  ? { ...route, airline_name: airlineData[route.airline] }
                  : {
                      ...route,
                      airline_name:
                        airlineData[route.airlines[route.airlines.length - 1]],
                    };
              });

              let shownRoutes = [routes[0]];

              if (routes.length > 1) {
                shownRoutes = [...shownRoutes, routes[routes.length - 1]];
              }

              return {
                baglimit: res_data.baglimit,
                booking_token: res_data.booking_token,
                deep_link: res_data.deep_link,
                price: res_data.price,
                quality: res_data.quality,
                route: shownRoutes,
                allRoutes: routes,
                stops: res_data.route.length - 2,
              };

              return res_data.route.map((res_data1) => {
                return {
                  baglimit: res_data.baglimit,
                  booking_token: res_data.booking_token,
                  deep_link: res_data.deep_link,
                  price: res_data.price,
                  quality: res_data.quality,
                  // TODO
                  airlines_code: res_data1["airline"],
                  airlines_name: airlineData[res_data1["airline"]],
                  cityFrom: res_data1["cityFrom"],
                  cityTo: res_data1["cityTo"],
                  conversion: res_data1["conversion"],
                  fare: res_data1["fare"],
                  facilitated_booking_available:
                    res_data1["facilitated_booking_available"],
                  utc_arrival: res_data1["utc_arrival"],
                  utc_departure: res_data1["utc_departure"],
                };
              });
            });
            console.log(row_data);
            props.setDataFlightSearch(row_data);
          })
          .catch((e) => {
            console.log(e);
            console.log("catch123");
          });
      }
    }
  };

  const cabinClass = [
    { label: "Economy", id: "M" },
    { label: "Economy Premium", id: "W" },
    { label: "Business", id: "C" },
    { label: "First Class", id: "F" },
  ];

  const handleChange = (event) => {
    setTrip(event.target.value);
    console.log("Booking option is " + event.target.value);
    props.handleChildProps(event.target.value);
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid md={4} mdOffset={3} smOffset={2} sm={8}>
          <FormControl required fullWidth>
            <InputLabel sx={{ mt: 2 }}>Booking Options</InputLabel>
            <Select
              value={trip}
              onChange={handleChange}
              autoWidth
              label="Trip"
              variant="filled"
              color="white"
            >
              <MenuItem value={21}>No Return</MenuItem>
              <MenuItem value={10}>Multi-city</MenuItem>
            </Select>
          </FormControl>

          {/* From and To */}
          <Autocomplete
            sx={{ width: 1, mt: 2 }}
            options={iataDataFrom.sort(
              (a, b) => -b.Country.localeCompare(a.Country)
            )}
            groupBy={(option) => option.Country}
            getOptionLabel={(option) => option.CITY}
            onChange={(event, newValue) => {
              setFromValue(newValue);
              const fromData = iataDataFrom.filter(
                (item) => item?.IATA_CODE !== newValue?.IATA_CODE
              );
              setIataDataTo(fromData);
            }}
            filterOptions={filterOptions}
            renderInput={(params) => (
              <TextField sx={{ width: 1 }} {...params} label="From" />
            )}
          />

          <Autocomplete
            sx={{ mt: 2 }}
            options={iataDataTo.sort(
              (a, b) => -b.Country.localeCompare(a.Country)
            )}
            groupBy={(option) => option.Country}
            getOptionLabel={(option) => option.CITY}
            onChange={(event, newValue) => {
              setToValue(newValue);
            }}
            filterOptions={filterOptions}
            renderInput={(params) => (
              <TextField sx={{ width: 1 }} {...params} label="To" />
            )}
          />

          {/*  Number of Adults */}
          <TextField
            id="filled-number"
            label="Adults"
            type="number"
            defaultValue={1}
            sx={{ width: 1, mt: 2 }}
            variant="filled"
          />

          {/* Number of children */}
          <TextField
            id="filled-number"
            label="Children"
            type="number"
            defaultValue={0}
            sx={{ width: 1, mt: 2 }}
          />
        </Grid>

        <Grid md={4} sm={8}>
          {/* <DateRangePicker
          minDate={new Date()}
          ranges={dateRange}
          onChange={(ranges) => setDateRange([ranges.selection])} /> */}

          {/* <DatePicker
            value={selectedDayRange}
            onChange={setSelectedDayRange}
            inputPlaceholder="Select a day range"
            shouldHighlightWeekends
          /> */}
          <Calendar
            minimumDate={utils().getToday()}
            value={selectedDayRange}
            onChange={setSelectedDayRange}
            calendarClassName="responsive-calendar" // added this
            shouldHighlightWeekends
          />
        </Grid>

        <Grid md={7} mdOffset={3}>
          <Button
            variant="contained"
            onClick={handleButtonClick}
            sx={{ mt: 0 }}
            fullWidth
          >
            Search
          </Button>
        </Grid>
      </Grid>
      <ErrorModal
        open={openModal}
        onClose={handleCloseModal}
        errorMessage={errorMessage}
      />
    </>
  );
}

export default SearchForm;
