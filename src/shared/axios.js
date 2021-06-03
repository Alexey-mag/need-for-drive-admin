import axios from "axios";

const axiosApi = axios.create();

axiosApi.interceptors.request.use(async config => {
  config.headers = {
    "X-Api-Factory-Application-Id": `${process.env["VUE_APP_API_FACTORY_ID"]}`,
    "Content-Type": "application/json",
  };
  config.baseURL = process.env.VUE_APP_API_PROD;
  return config;
});

export default axiosApi;
