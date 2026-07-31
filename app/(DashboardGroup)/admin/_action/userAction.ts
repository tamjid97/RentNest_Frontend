"use server";

import { cookies } from "next/headers";

// ✅ ফিক্স: ব্যাকএন্ড স্কিমার সাথে মিলিয়ে টাইপ ডিফাইন করা হয়েছে
export type UserItem = {
  id: string;
  name: string;
  email: string;
  role: "TENANT" | "LANDLORD" | "ADMIN";
  activeStatus: "ACTIVE" | "BLOCKED" | "BANNED";
  profilePhoto?: string | null; // ✅ ফিক্স: profilePhoto যুক্ত করা হয়েছে
  createdAt: string;
  updatedAt: string;
};

type UserApiResponse = {
  success: boolean;
  statusCode?: number;
  message: string;
  data?: UserItem[] | { data?: UserItem[] } | UserItem;
};

// ১. সকল ইউজার ফেচ করার ফাংশন
export async function getAllUsers(): Promise<UserApiResponse> {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
      return { success: false, message: "Unauthorized! Please login first." };
    }

    const res = await fetch(`${process.env.BACKEND_API_URL}/api/admin/users`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      cache: "no-store",
    });

    return await res.json();
  } catch (error) {
    console.error("Fetch users error:", error);
    return { success: false, message: "Something went wrong while fetching users." };
  }
}

// ২. ইউজারের স্ট্যাটাস আপডেট (Ban / Active) করার ফাংশন
export async function updateUserStatus(userId: string, activeStatus: string): Promise<UserApiResponse> {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
      return { success: false, message: "Unauthorized! Please login first." };
    }

    // আপনার ব্যাকএন্ডের রাউট অনুযায়ী এন্ডপয়েন্ট
    const res = await fetch(`${process.env.BACKEND_API_URL}/api/admin/users/${userId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ status: activeStatus }),
    });

    return await res.json();
  } catch (error) {
    console.error("Update status error:", error);
    return { success: false, message: "Failed to update user status." };
  }
}