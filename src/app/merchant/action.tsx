"use server";

import axiosConfig from "@/api.config/axios.config";
import { redirect } from "next/navigation";

const getMerchantData = async () => {
  try {
    const response = await axiosConfig.get("/user/getUserData/");
    return { success: true, data: response.data };
  } catch (error) {
    console.log("Error fetching data:", error);
    return { success: false, message: "Something went wrong", data: null };
  }
};

const redirectHome = () => {
  redirect("/");
};

export { getMerchantData, redirectHome };
