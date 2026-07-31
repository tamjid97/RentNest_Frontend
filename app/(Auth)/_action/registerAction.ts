"use server"

import { revalidateTag } from "next/cache";
import { isAccessTokenExist } from "./loginAction";

export type PostState = {
  success: boolean;
  statusCode: number;
  message: string;
  data: Record<string, unknown> | null;
}

export const registerUser = async (prevState: PostState, formData: FormData): Promise<PostState> => {
  const accessToken = await isAccessTokenExist();

  const payload = {
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    role: formData.get("role"),
    profilePhoto: formData.get("profilePhoto"),
  };

  try {
    const res = await fetch(`${process.env.BACKEND_API_URL}/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        cookie: `accessToken=${accessToken}`,
      },
      body: JSON.stringify(payload),
    });

    const result = await res.json();

    if (!res.ok) {
      console.error("Backend Error:", result);
      return {
        success: false,
        statusCode: res.status,
        message: result?.message || "Registration failed. Please try again.",
        data: null
      };
    }

    if (result.success) {
      // Next.js এর রুল অনুযায়ী দ্বিতীয় আর্গুমেন্ট (যেমন 'max' বা টাইম) পাস করা হলো
      revalidateTag("register", "max"); 
    }

    return {
      success: true,
      statusCode: result.statusCode,
      message: result.message,
      data: result.data || null
    };

  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Something went wrong in the server.";
    console.error("Server Action Fetch Error:", error);
    return {
      success: false,
      statusCode: 500,
      message: errorMessage,
      data: null
    };
  }
};