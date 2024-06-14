"use server";

import axios from "axios";
import { unstable_noStore as noStore } from "next/cache";

interface Config {
  backend: string;
}

const config: Config = {
  backend: process.env.NEXT_PUBLIC_BACKEND_LINK || "http://localhost:3001",
};

const getCardData = async (token: string) => {
  const postLink = `${config.backend}/payment/totalPayment`;
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

const getTableData = async (token: string) => {
  const postLink = `${config.backend}/payment/merchant/payments`;
  try {
    const response = await axios.get(postLink, {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });
    console.log(response.data);
    noStore();
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Error fetching data:", error);
    return { success: false, message: "Something went wrong", data: null };
  }
};

export { getCardData, getTableData };
