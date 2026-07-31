"use server";

import { cookies } from "next/headers";

const handleApiResponse = async (res: Response) => {
    const contentType = res.headers.get("content-type");
    
    // যদি রেসপন্স JSON না হয়ে HTML বা অন্য কিছু হয়
    if (!contentType || !contentType.includes("application/json")) {
        const text = await res.text();
        console.error("Non-JSON response from backend:", text);
        return {
            success: false,
            statusCode: res.status,
            message: `Server error! Backend returned non-JSON response (Status: ${res.status})`,
            data: []
        };
    }

    return await res.json();
};

export const getProperty = async () => {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value || null;
    
    try {
        // হেডার তৈরি, টোকেন থাকলে কুকি পাঠানো হবে, না থাকলে ফাঁকা থাকবে
        const headers: Record<string, string> = {};
        if (accessToken) {
            headers["Cookie"] = `accessToken=${accessToken}`;
        }

        const res = await fetch(`${process.env.BACKEND_API_URL}/api/properties`, {
            headers,
            next: {
                tags: ["catagory"]
            }
        });

        const result = await handleApiResponse(res);
        return result;
    } catch (error) {
        console.error("Get property Error:", error);
        return { success: false, message: "Failed to connect to the backend server!", data: [] };
    }
};

export const getPropertyById = async (id: string) => {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value || null;
    
    // 🔍 টোকেন পাওয়া যাচ্ছে কি না চেক করার জন্য
    console.log(">>> getPropertyById - Token found:", accessToken);

    if (!accessToken) {
        console.log(">>> getPropertyById - No access token found in cookies!");
        return {
            success: false,
            message: "User not logged in!",
            data: null
        };
    }

    try {
        const res = await fetch(`${process.env.BACKEND_API_URL}/api/properties/${id}`, {
            headers: {
                Cookie: `accessToken=${accessToken}`
            },
            cache: "no-store" // ডিটেইলস পেজে লেটেস্ট ডেটা পাওয়ার জন্য ক্যাশ বন্ধ রাখা
        });

        const result = await handleApiResponse(res);
        
        // 🔍 ব্যাকএন্ড থেকে পুরো ডেটা অবজেক্ট কী আসছে তা টার্মিনালে প্রিন্ট করার জন্য
        console.log(">>> getPropertyById - Backend Response:", JSON.stringify(result, null, 2));

        return result;
    } catch (error) {
        console.error("Get property by ID Error:", error);
        return { success: false, message: "Failed to connect to the backend server!", data: null };
    }
};