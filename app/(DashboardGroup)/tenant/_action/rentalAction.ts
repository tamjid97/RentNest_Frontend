"use server";

import { cookies } from "next/headers";

type ResponseState = {
    success: boolean;
    statusCode?: number;
    message: string;
    data?: unknown;
};

export async function getMyRentalRequest(): Promise<ResponseState> {
    try {
        const cookieStore = await cookies();
        const accessToken = cookieStore.get("accessToken")?.value;

        if (!accessToken) {
            return {
                success: false,
                message: "Unauthorized! Please login first.",
            };
        }

        const res = await fetch(`${process.env.BACKEND_API_URL}/api/rentals`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
            },
            cache: "no-store",
        });

        const textResponse = await res.text();
        
        // 🔍 টার্মিনালে ব্যাকএন্ডের আসল রেসপন্স দেখতে এটি প্রিন্ট করা হলো
        console.log("=== BACKEND RENTALS RAW RESPONSE ===", textResponse);

        let parsedData;
        try {
            parsedData = JSON.parse(textResponse);
        } catch (e) {
            return {
                success: res.ok,
                message: textResponse || "Rental requests fetched successfully.",
                data: textResponse,
            };
        }

        // ব্যাকএন্ড থেকে ডেটা সরাসরি অ্যারে (`[...]`) আসলে তা standard format-এ রূপান্তর করা
        if (Array.isArray(parsedData)) {
            return {
                success: res.ok,
                message: "Rental requests fetched successfully.",
                data: parsedData,
            };
        }

        // যদি ব্যাকএন্ড অবজেক্ট আকারে দেয়
        return {
            success: parsedData?.success ?? res.ok,
            message: parsedData?.message || "Rental requests fetched successfully.",
            data: parsedData?.data ?? parsedData,
        };
    } catch (error) {
        console.error("Get rental requests error:", error);
        return {
            success: false,
            message: "Something went wrong while fetching requests.",
        };
    }
}