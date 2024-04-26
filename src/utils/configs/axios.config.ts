import Axios from "axios";

export const axios = Axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

// Add a request interceptor
axios.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    const accessToken = localStorage.getItem("access-token");

    if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;

    return config;
  },
  function (error) {
    // Do something with request error
    console.error("Axios inerception error: ", error);

    return Promise.reject(error);
  }
);
