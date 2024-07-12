"use server";

import axiosConfig from "@/api.config/axios.config";
import { unstable_noStore as noStore } from "next/cache";
// import { redirect } from "next/navigation";
import { StoreInfo, StoreUpdate } from "@/app/types/store.type";
import { redirect } from "next/navigation";

const getStores = async (id: number) => {
  try {
    const response = await axiosConfig.post<StoreInfo>(
      `/store/storeData/${id}`,
      {
        id: id,
      },
    );
    noStore();
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, message: "Something went wrong" };
  }
};

const updateStore = async (
  id: number,
  store: StoreUpdate,
  imageChange: boolean,
) => {
  try {
    const response = await axiosConfig.put(`/store/${id}`, {
      name: store.name,
      address: store.address,
      email: store.email,
      description: store.description,
      imageChange,
      logo: store.logo,
      phone: store.phone,
    });
    return { success: true, data: response.data };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Something went wrong" };
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

const navigateStorePage = () => {
  redirect("/merchant/store");
};

export { updateStore, navigateStorePage, getStores, deleteStore };
