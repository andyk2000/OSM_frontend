import axios from "axios";

interface Config {
  backend: string;
}

const conf: Config = {
  backend: process.env.NEXT_PUBLIC_BACKEND_LINK || "http://localhost:3001",
};

let userToken = "";

const getToken = (token: string) => {
  userToken = token;
};

const axiosConfig = axios.create({
  baseURL: conf.backend,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosConfig.interceptors.request.use(
  (config) => {
    config.headers.Authorization = userToken;
    console.log(config.headers.Authorization);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
axiosConfig.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
    }
    return Promise.reject(error);
  },
);

export { axiosConfig, getToken };
