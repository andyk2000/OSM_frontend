"use server";

import axios from "axios";

// eslint-disable-next-line react-hooks/rules-of-hooks
let message = "";

const sendMessage = () => {
  return message;
};

interface User {
  names: string;
  email: string;
  password: string;
  role: string;
}

interface Config {
  backend: string;
}

const config: Config = {
  backend: process.env.NEXT_PUBLIC_BACKEND_LINK || "http://localhost:3000",
};

const createPost = async (postData: User) => {
  const postLink = config.backend + "/user/signup";
  try {
    const response = await axios.post(postLink, postData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Error creating post:", error);
    return { success: false, message: "Something went wrong" };
  }
};

const handleSubmit = async (confirmPassword: string, user: User) => {
  if (user.password !== confirmPassword) {
    message = "Passwords do not match";
    return message;
  }

  try {
    const res = await createPost(user);
    if (res.success && res.data) {
      message = "Sign up successful";
      return message;
    }

    if (!res.success && res.message) {
      message = res.message;
      return message;
    }
  } catch (error) {
    message = "Sign up failed. Please try again.";
    return message;
  }
};

export { handleSubmit, sendMessage };
