/* eslint-disable prettier/prettier */
"use server";

import axios from "axios";
import { cookies } from "next/headers";

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
  async (config) => {
    const token = cookies().get("token")?.value;
    config.headers.Authorization = token;
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

export default axiosConfig;
