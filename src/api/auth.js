import api from "./api";

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

export async function get_search_flights(data) {
  return await api().post("/search_flights/",data);
}

export async function subscribe_sms(data) {
  return await api().post("/send_sms/",data);
}

export async function subscribe_email(data) {
  return await api().post("/send_email/",data);
}

export async function post_booking_users(data) {
  return await api().post("/booking/users/",data);
}

export async function post_booking_payment(data) {
  return await api().post("/booking/payment/",data);
}

export async function post_booking_final(data) {
  return await api().post("/booking/final/",data);
}
