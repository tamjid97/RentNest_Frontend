"use server";

import { cookies } from "next/headers";

export const getPaymentHistory = async () => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value || cookieStore.get("accessToken")?.value;


    const BASE_URL = "https://rent-nest-nu-hazel.vercel.app/api";

    const res = await fetch(`${BASE_URL}/payments`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: token.startsWith("Bearer ") ? token : `Bearer ${token}` } : {}),
      },
      cache: "no-store", 
    });

    if (!res.ok) {
      console.error(`API Error: ${res.status} ${res.statusText}`);
      return { success: false, data: [] };
    }

    const data = await res.json();
    return data;
  } catch (error: unknown) { 
    console.error("Payment history fetch error:", error);
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
    return { success: false, data: [], message: errorMessage };
  }
};


// paymentPageAction.ts

export const getSinglePaymentDetails = async (paymentId: string) => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value || cookieStore.get("accessToken")?.value;
    

    const BASE_URL = "https://rent-nest-nu-hazel.vercel.app/api";

    const res = await fetch(`${BASE_URL}/payments/${paymentId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: token.startsWith("Bearer ") ? token : `Bearer ${token}` } : {}),
      },
      cache: "no-store",
    });

    if (!res.ok) {
      console.error(`API Error: ${res.status} ${res.statusText}`);
      return { success: false, data: null };
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Fetch single payment error:", error);
    return { success: false, data: null };
  }
};