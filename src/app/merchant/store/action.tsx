"use server";

import { axiosConfig } from "@/api.config/axios.config";
import { unstable_noStore as noStore } from "next/cache";
import { redirect } from "next/navigation";

const getStores = async (token: string) => {
  try {
    const response = await axiosConfig.get("/store/", {
      headers: {
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

const getCardData = async (storeId: number, token: string) => {
  try {
    const response = await axiosConfig.post(
      "/store/card/data",
      {
        storeId: storeId,
      },
      {
        headers: {
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

const getPrimaryTableData = async (storeId: number, token: string) => {
  try {
    const response = await axiosConfig.post(
      "/payment/service-sold",
      {
        storeId: storeId,
      },
      {
        headers: {
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

const getStats = async (storeId: number, token: string) => {
  try {
    const response = await axiosConfig.post(
      "/payment/stats",
      {
        storeId: storeId,
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
  storeId: number,
  token: string,
  search_string: string,
  activeCategory: string,
) => {
  try {
    const response = await axiosConfig.post(
      "/payment/search",
      {
        storeId: storeId,
        search_string: search_string.toLowerCase(),
        category: activeCategory,
      },
      {
        headers: {
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
  storeId: number,
  token: string,
  start_date?: string,
  end_date?: string,
) => {
  try {
    const response = await axiosConfig.post(
      "/payment/filter/date",
      {
        storeId: storeId,
        end_date: end_date,
        start_date: start_date,
      },
      {
        headers: {
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
