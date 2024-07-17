"use server";

import axiosConfig from "@/api.config/axios.config";
import { unstable_noStore as noStore } from "next/cache";
import { redirect } from "next/navigation";
import { StoreInfo } from "@/app/types/store.type";

const getStores = async () => {
  try {
    const response = await axiosConfig.get<StoreInfo[]>("/store/");
    noStore();
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, message: "Something went wrong" };
  }
};

const getCardData = async (storeId: number) => {
  try {
    const response = await axiosConfig.post("/store/card/data", {
      storeId: storeId,
    });
    noStore();
    return { success: true, data: response.data };
  } catch (error) {
    return {
      success: false,
      message: "Something went wrong",
    };
  }
};

const getPrimaryTableData = async (storeId: number) => {
  try {
    const response = await axiosConfig.post("/payment/service-sold", {
      storeId: storeId,
    });
    noStore();
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, message: "something went wrong", data: null };
  }
};

const getStats = async (storeId: number) => {
  try {
    const response = await axiosConfig.post("/payment/stats", {
      storeId: storeId,
    });
    noStore();
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, message: "something went wrong", data: null };
  }
};

const searchData = async (
  storeId: number,
  search_string: string,
  activeCategory: string,
) => {
  try {
    const response = await axiosConfig.post("/payment/search", {
      storeId: storeId,
      search_string: search_string.toLowerCase(),
      category: activeCategory,
    });
    noStore();
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, message: "something went wrong", data: null };
  }
};

const filterData = async (
  storeId: number,
  start_date?: string,
  end_date?: string,
) => {
  try {
    const response = await axiosConfig.post("/payment/filter/date", {
      storeId: storeId,
      end_date: end_date,
      start_date: start_date,
    });
    noStore();
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, message: "something went wrong", data: null };
  }
};

const deleteStore = async (id: number) => {
  try {
    const response = await axiosConfig.delete(`/store/${id}`);
    console.log(response);
    return { success: true, data: response.data };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Something went wrong" };
  }
};

const redirectToLogin = () => {
  redirect("/login");
};

const newStore = () => {
  redirect("/merchant/store/new");
};

export {
  getStores,
  getCardData,
  getPrimaryTableData,
  getStats,
  searchData,
  filterData,
  redirectToLogin,
  newStore,
  deleteStore,
};
