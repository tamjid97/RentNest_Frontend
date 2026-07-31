"use server";

import { cookies } from "next/headers";

export const getPaymentHistory = async () => {
  try {
    // 🌟 ১. cookies() এর আগে await যুক্ত করা হয়েছে
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    const res = await fetch("https://rent-nest-nu-hazel.vercel.app/api/payments", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: token } : {}),
      },
      cache: "no-store", 
    });

    const data = await res.json();
    return data;
  } catch (error: unknown) { 
    // 🌟 ২. 'any' এর পরিবর্তে 'unknown' ব্যবহার করা হয়েছে
    console.error("Payment history fetch error:", error);
    
    // Error মেসেজ বের করার নিরাপদ পদ্ধতি
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
    
    return { success: false, data: null, message: errorMessage };
  }
};