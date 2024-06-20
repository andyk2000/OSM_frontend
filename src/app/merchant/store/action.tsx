"use server";

import axios from "axios";
import { unstable_noStore as noStore } from "next/cache";
import { redirect } from "next/navigation";

interface Config {
  backend: string;
}

const config: Config = {
  backend: process.env.NEXT_PUBLIC_BACKEND_LINK || "http://localhost:3001",
};

const getStores = async (token: string) => {
  const postLink = `${config.backend}/store/`;
  try {
    const response = await axios.get(postLink, {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });
    noStore();
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Error fetching data:", error);
    return { success: false, message: "Something went wrong", data: null };
  }
};

const getCardData = async (store_id: number, token: string) => {
  const postLink = `${config.backend}/store/card/data`;
  try {
    const response = await axios.post(
      postLink,
      {
        store_id: store_id,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      },
    );
    noStore();
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Error fetching data:", error);
    return { success: false, message: "Something went wrong", data: null };
  }
};

const getPrimaryTableData = async (store_id: number, token: string) => {
  const postLink = `${config.backend}/payment/service-sold`;
  try {
    const response = await axios.post(
      postLink,
      {
        store_id: store_id,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      },
    );
    noStore();
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Error fetching data:", error);
    return { success: false, message: "something went wrong", data: null };
  }
};

const getStats = async (store_id: number, token: string) => {
  const postLink = `${config.backend}/payment/stats`;
  try {
    const response = await axios.post(
      postLink,
      {
        store_id: store_id,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      },
    );
    noStore();
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Error fetching data:", error);
    return { success: false, message: "something went wrong", data: null };
  }
};

const searchData = async (
  store_id: number,
  token: string,
  search_string: string,
  activeCategory: string,
) => {
  const searchLink = `${config.backend}/payment/search`;
  try {
    const response = await axios.post(
      searchLink,
      {
        store_id: store_id,
        search_string: search_string.toLowerCase(),
        category: activeCategory,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      },
    );
    noStore();
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Error fetching data:", error);
    return { success: false, message: "something went wrong", data: null };
  }
};

const filterData = async (
  store_id: number,
  token: string,
  start_date?: string,
  end_date?: string,
) => {
  const searchLink = `${config.backend}/payment/filter/date`;
  try {
    const response = await axios.post(
      searchLink,
      {
        store_id: store_id,
        end_date: end_date,
        start_date: start_date,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      },
    );
    noStore();
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Error fetching data:", error);
    return { success: false, message: "something went wrong", data: null };
  }
};

const redirectToLogin = () => {
  redirect("/login");
};

export {
  getStores,
  getCardData,
  getPrimaryTableData,
  getStats,
  searchData,
  filterData,
  redirectToLogin,
};
