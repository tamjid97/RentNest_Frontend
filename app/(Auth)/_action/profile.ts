"use server";

import { cookies } from "next/headers";
import { revalidateTag } from "next/cache";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL || "https://rent-nest-nu-hazel.vercel.app";

// ১. প্রোফাইল ডাটা গেট করার সার্ভার অ্যাকশন
export const getProfileApi = async () => {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value || null;

    if (!accessToken) {
      return {
        success: false,
        message: "user not logged!",
      };
    }

    const res = await fetch(`${BACKEND_URL}/api/auth/me`, {
      headers: {
        cookie: `accessToken=${accessToken}`,
      },
      cache: "force-cache",
      next: {
        revalidate: 60 * 60 * 24, // ২৪ ঘণ্টার জন্য ক্যাশ থাকবে
        tags: ["my-profile"],
      },
    });

    if (!res.ok) {
      return {
        success: false,
        message: "Failed to fetch profile",
      };
    }

    const result = await res.json();
    return result;
  } catch (error) {
    console.error("Error fetching profile:", error);
    return {
      success: false,
      message: "Something went wrong",
    };
  }
};

export const getMe = getProfileApi;

// ২. প্রোফাইল আপডেট করার সার্ভার অ্যাকশন (ফোন নম্বর বাদ দেওয়া হয়েছে)
export const updateProfileApi = async (formData: {
  name?: string;
  profilePhoto?: string;
}) => {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value || null;

    if (!accessToken) {
      return {
        success: false,
        message: "user not logged!",
      };
    }

    const res = await fetch(`${BACKEND_URL}/api/auth/update-profile`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        cookie: `accessToken=${accessToken}`,
      },
      body: JSON.stringify(formData),
    });

    const result = await res.json();

    if (result.success) {
      revalidateTag("my-profile","max");
    }

    return result;
  } catch (error) {
    console.error("Error updating profile:", error);
    return {
      success: false,
      message: "Something went wrong",
    };
  }
};