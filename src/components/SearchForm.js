import React, { useEffect, useState } from "react";
import { whereNot } from "structkit";
import {
  Box,
  Container,
  Grid,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Card,
  TextField,
  Autocomplete,
} from "@mui/material";

import { DateRangePicker } from "react-date-range";
import Modal from "./Modal";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file

import {
  get_iata,
  get_search_flights_single,
  get_search_flights_multiple,
  get_airline_code,
} from "@/api/auth";

function SearchForm(props) {
  const [iataDataFrom, setIataDataFrom] = useState([]);
  const [iataDataTo, setIataDataTo] = useState([]);
  const [airlineData, setAirlineData] = useState({});
  const [fromValue, setFromValue] = useState(null);
  const [toValue, setToValue] = useState(null);
  const [trip, setTrip] = React.useState(10);

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
    get_iata()
      .then((res) => {
        setIataDataFrom(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
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

  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const handleButtonClick = async () => {
    if (!fromValue || !fromValue.IATA_CODE) {
      // handle error when textbox is empty
      console.log("From textbox is empty");
      return;
    }
    if (!toValue || !toValue.IATA_CODE) {
      // handle error when textbox is empty
      console.log("To textbox is empty");
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

        get_search_flights_multiple(dataSearchFlights)
          .then(async (res, req) => {
            const row_data = await res.data.map((res_data) => {
              return res_data.route.map((res_data1) => {
                return {
                  baglimit: res_data.baglimit,
                  booking_token: res_data.booking_token,
                  deep_link: res_data.deep_link,
                  price: res_data.price,
                  quality: res_data.quality,
                  // TODO
                  airlines_code: res_data1["airlines"],
                  airlines_name: airlineData[res_data1["airlines"]],
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
            props.setDataFlightSearch(row_data);
          })
          .catch((e) => {});
      }
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
            console.log(res);
            const row_data = await res.data.data.map((res_data) => {
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

  const handleLogDates = () => {
    console.log(
      dateRange.map(({ startDate, endDate }) => ({
        startDate: startDate.toLocaleDateString("en-GB"),
        endDate: endDate.toLocaleDateString("en-GB"),
      }))
    );
  };

  const cabinClass = [
    { label: "Economy", id: "M" },
    { label: "Economy Premium", id: "W" },
    { label: "Business", id: "C" },
    { label: "First Class", id: "F" },
  ];

  const handleChange = (event) => {
    setTrip(event.target.value);
  };

  return (
    <Card
      sx={{
        maxWidth: "80%",
        margin: "50px auto",
        marginTop: -90,
        backgroundColor: "white",
      }}
    >
      <Box component="section" sx={{ display: "flex", overflow: "hidden" }}>
        <Container
          sx={{
            mb: 5,
            position: "relative",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            borderRadius: 5,
            padding: 5,
          }}
        >
          <Grid container spacing={2} sx={{ marginTop: 3, mb: 4 }}>
            <Grid
              item
              xs={6}
              sx={{
                display: "flex",
                alignItems: "center",
                mb: 2,
              }}
            >
              {/* Booking Options */}
              <FormControl required fullWidth>
                <InputLabel id="demo-simple-select-autowidth-label">
                  Booking Options
                </InputLabel>
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
            </Grid>
            <Grid
              item
              xs={6}
              sx={{
                display: "flex",
                alignItems: "center",
                mb: 2,
              }}
            >
              <FormControl fullWidth>
                {/* Notification modal */}
                <Modal />
              </FormControl>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={3}>
              {/* From and To */}
              <Autocomplete
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
              {/*  Number of Adults */}
              <TextField
                id="filled-number"
                label="Adults"
                type="number"
                defaultValue={1}
                sx={{ width: 1, mt: 5 }}
                variant="filled"
              />
              {/* Number of children */}
              <TextField
                id="filled-number"
                label="Children"
                type="number"
                defaultValue={0}
                sx={{ width: 1, mt: 5 }}
              />
            </Grid>
            <Grid item xs={3}>
              {/* Cabin Class */}
              <Autocomplete
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
              <TextField
                id="filled-number"
                label="Infant"
                defaultValue={0}
                type="number"
                sx={{ width: 1, mt: 5 }}
              />
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={cabinClass}
                defaultValue={"Economy"}
                renderInput={(params) => (
                  <TextField {...params} label="Cabin Class" />
                )}
                sx={{ width: 1, mt: 5 }}
              />
            </Grid>
            {/* Date Range Picker */}
            <Grid item xs={6}>
              <DateRangePicker
                minDate={new Date()}
                ranges={dateRange}
                onChange={(ranges) => setDateRange([ranges.selection])}
              />
            </Grid>
          </Grid>

          <Grid item xs={3}>
            <Button
              variant="contained"
              onClick={handleButtonClick}
              sx={{ mt: 4 }}
            >
              Search
            </Button>
          </Grid>
        </Container>
      </Box>
    </Card>
  );
}

export default SearchForm;
