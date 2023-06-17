import api from "./api";
import axios from "axios";

export async function healthz() {
  return await api().get("/healthz");
}

export async function login(username, password) {
  return await api().post("/login", {
    username: username,
    password: password,
  });
}

export async function get_iata() {
  return await api().get("/iata_code/");
}

export async function get_airline_code() {
  return await api().get("/airline_code/");
}

// export async function get_search_flights_single(data) {
//   return await api().post("/search_flights/single/",data);
// }
export async function get_search_flights_single(data) {
  const headers = {
    // Add your desired headers here
    "Content-Type": "application/json",
    Authorization: sessionStorage.getItem("token"),
  };

  try {
    const response = await axios.post("/search_flights/single/", data, {
      headers,
    });
    return response.data;
  } catch (error) {
    console.error("Error in API request:", error);
    throw error;
  }
}

export async function get_search_flights_multiple(data) {
  return await api().post("/search_flights/multiple/", data);
}

export async function subscribe_sms(data) {
  return await api().post("/send_sms/", data);
}

export async function subscribe_email(data) {
  return await api().post("/send_email/", data);
}

export async function post_booking_users(data) {
  return await api().post("/booking/users/", data);
}

export async function post_booking_payment(data) {
  return await api().post("/booking/payment/", data);
}

export async function post_booking_final(data) {
  return await api().post("/booking/final/", data);
}
