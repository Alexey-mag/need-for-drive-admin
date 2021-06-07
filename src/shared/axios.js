import axios from "axios";

const base64Token = localStorage.getItem("token64");

const axiosApi = axios.create();

axiosApi.interceptors.request.use(async config => {
  if (localStorage.getItem("token")) {
    config.headers = {
      "X-Api-Factory-Application-Id": `${process.env["VUE_APP_API_FACTORY_ID"]}`,
      "Content-Type": "application/json",
    };
  } else {
    config.headers = {
      "X-Api-Factory-Application-Id": `${process.env["VUE_APP_API_FACTORY_ID"]}`,
      "Content-Type": "application/json",
      "Authorization": "Basic " + base64Token,
    };
  }

  config.baseURL = process.env.VUE_APP_API_PROD;
  return config;
});

export default axiosApi;
