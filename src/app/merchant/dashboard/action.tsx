"use server";

import { axiosConfig, getToken } from "@/api.config/axios.config";
import { unstable_noStore as noStore } from "next/cache";

const getCardData = async (token: string) => {
  getToken(token);
  try {
    getToken(token);
    const response = await axiosConfig.get("/payment/totalPayment");
    noStore();
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Error fetching data:", error);
    return { success: false, message: "Something went wrong", data: null };
  }
};

const getTableData = async (token: string) => {
  getToken(token);
  try {
    const response = await axiosConfig.get("/payment/merchant/payments");
    noStore();
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Error fetching data:", error);
    return { success: false, message: "Something went wrong", data: null };
  }
};

export { getCardData, getTableData };
