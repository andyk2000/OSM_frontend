"use server";

import axiosConfig from "@/api.config/axios.config";
import { redirect } from "next/navigation";

interface User {
  email: string;
  password: string;
}

interface Message {
  message: string;
  token?: string;
}

const createPost = async (postData: User) => {
  try {
    const response = await axiosConfig.post("/user/login", postData);
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Error creating post:", error);
    return { success: false, message: "Login failed, try again." };
  }
};

const handleSubmit = async (user: User): Promise<Message> => {
  const message: Message = { message: "" };
  try {
    const res = await createPost(user);
    if (res.success) {
      message.message = "Login successful";
      message.token = res.data.token;
      return message;
    }
    message.message = res.message || "Login failed, try again.";
    return message;
  } catch (error) {
    message.message = "Login failed. Please try again.";
    console.error("Error in handleSubmit:", error);
    return message;
  }
};

const pageRedirect = () => {
  redirect("/merchant/dashboard");
};

export { handleSubmit, pageRedirect };
