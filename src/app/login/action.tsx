"use server";

import axios from "axios";
import { redirect } from "next/navigation";

interface User {
  email: string;
  password: string;
}

interface Config {
  backend: string;
}

interface Message {
  message: string;
  token?: string;
}

const config: Config = {
  backend: process.env.NEXT_PUBLIC_BACKEND_LINK || "http://localhost:3000",
};

const createPost = async (postData: User) => {
  const postLink = `${config.backend}/user/login`;
  console.log(`POST request to: ${postLink}`);
  try {
    const response = await axios.post(postLink, postData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Error creating post:", error);
    return { success: false, message: "Login failed, try again." };
  }
};

const handleSubmit = async (user: User): Promise<Message> => {
  console.log("Handling submit for user:", user);
  const message: Message = { message: "" };
  try {
    const res = await createPost(user);
    console.log("Response from createPost:", res);
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
