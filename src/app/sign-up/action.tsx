"use server";
import { axiosConfig } from "@/api.config/axios.config";
import { redirect } from "next/navigation";

// eslint-disable-next-line react-hooks/rules-of-hooks
let answer = "";

const sendMessage = () => {
  return answer;
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.response.data.error !== "Bad Request") {
      return {
        success: false,
        answer: error.response.data.error,
      };
    } else {
      return {
        success: false,
        answer: error.response.data.validation.body.message,
      };
    }
  }
};

const handleSubmit = async (user: User) => {
  try {
    const res = await createPost(user);
    if (res.success && res.data) {
      answer = "Sign up successful";
      const created = true;
      return { answer, created };
    }

    if (!res.success && res.answer) {
      answer = res.answer;
      const created = false;
      return { answer, created };
    }
  } catch (error) {
    answer = "Sign up failed. Please try again.";
    const created = false;
    return { answer, created };
  }
};

const redirectLogin = () => {
  redirect("/login");
};

export { handleSubmit, sendMessage, redirectLogin };
