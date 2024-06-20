"use server";
import { axiosConfig } from "@/api.config/axios.config";

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

const createPost = async (postData: User) => {
  try {
    const response = await axiosConfig.post("/user/signup", postData);
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
