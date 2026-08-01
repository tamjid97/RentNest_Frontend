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
            data: null
        };
    }

    return await res.json();
};

export const getProperty = async () => {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value || null;
    
    try {
        const headers: Record<string, string> = {
            "Content-Type": "application/json",
        };
        
        // টোকেন থাকলে হেডারে অ্যাড হবে
        if (accessToken) {
            headers["Authorization"] = `Bearer ${accessToken}`;
            headers["Cookie"] = `accessToken=${accessToken}`; // ব্যাকআপ হিসেবে কুকিও পাঠানো হলো
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
    
    // 🔍 টোকেন পাওয়া যাচ্ছে কি না চেক করার জন্য
    console.log(">>> getPropertyById - Token found:", accessToken ? "Yes" : "No");

    // ⚠️ এখান থেকে ব্লক করার লজিকটি (if !accessToken return) সরিয়ে ফেলা হয়েছে। 
    // কারণ আমাদের উদ্দেশ্য হলো লগইন না থাকলেও যেন ইউজার প্রোপার্টি দেখতে পারে।

    try {
        const headers: Record<string, string> = {
            "Content-Type": "application/json",
        };
        
        // 🌟 মূল ফিক্স: টোকেন থাকলে পাঠাবো, না থাকলে ফাঁকা যাবে।
        if (accessToken) {
            headers["Authorization"] = `Bearer ${accessToken}`;
            headers["Cookie"] = `accessToken=${accessToken}`;
        }

        const res = await fetch(`${process.env.BACKEND_API_URL}/api/properties/${id}`, {
            headers,
            cache: "no-store" // ডিটেইলস পেজে লেটেস্ট ডেটা পাওয়ার জন্য ক্যাশ বন্ধ রাখা
        });

        const result = await handleApiResponse(res);
        
        // 🔍 ব্যাকএন্ড থেকে পুরো ডেটা অবজেক্ট কী আসছে তা টার্মিনালে প্রিন্ট করার জন্য
        // console.log(">>> getPropertyById - Backend Response:", JSON.stringify(result, null, 2));

        return result;
    } catch (error) {
        console.error("Get property by ID Error:", error);
        return { success: false, message: "Failed to connect to the backend server!", data: null };
    }
};