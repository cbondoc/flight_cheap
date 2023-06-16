import axios from "axios";

const list_except_path_auth = ["/login", "/healthz"];

export default function handler() {
  const instance = axios.create({
    // For localhost
    // baseURL: "http://test-api.flightcheap.store",

    // For live link deployment
    baseURL: "http://api.flightcheap.store",

    // For accessing localhost python
    // baseURL: "http://localhost:6700",

    // Needed, regardless if for localhost, live or python backend
    withCredentials: true,
  });

  // Add a request interceptor
  instance.interceptors.request.use(
    function (config) {
      // Do something before request is sent
      if (list_except_path_auth.indexOf(config.url) === -1) {
        const token = sessionStorage.getItem("token");
        if (token !== null) {
          config.headers["Bearer-Authentication"] = token;

          return config;
        } else {
          window.sessionStorage.clear();
          alert("Session has expired, please try to login again");
          window.location.href = "/access/login"; // add this line
        }
      }
      return config;
    },
    function (error) {
      // Do something with request error
      return Promise.reject(error);
    }
  );

  // Add a response interceptor
  instance.interceptors.response.use(
    function (response) {
      // Any status code that lies within the range of 2xx causes this function to trigger
      // Do something with response data
      return response;
    },
    function (error) {
      // Any status codes that fall outside the range of 2xx cause this function to trigger
      // Do something with response error
      if (error.response.data.detail === "X-Token header expired") {
        window.sessionStorage.clear();
        window.location.reload();
      }
      return Promise.reject(error);
    }
  );

  return instance;
}
