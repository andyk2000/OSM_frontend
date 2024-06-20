import axios from "axios";

interface Config {
  backend: string;
}

const conf: Config = {
  backend: process.env.NEXT_PUBLIC_BACKEND_LINK || "http://localhost:3001",
};

const axiosConfig = axios.create({
  baseURL: conf.backend,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosConfig.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    // Handle the request error here
    return Promise.reject(error);
  },
);

// Response Interceptor
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

export { axiosConfig };
