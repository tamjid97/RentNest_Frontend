"use server";

import { cookies } from "next/headers";

const handleApiResponse = async (res: Response) => {
    const contentType = res.headers.get("content-type");
    
    // যদি রেসপন্স JSON না হয়ে HTML বা অন্য কিছু হয়
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


export const getCatagory = async () => {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value || null;
    
    if (!accessToken) {
        return {
            success: false,
            message: "User not logged in!",
            data: []
        };
    }

    try {
        const res = await fetch(`${process.env.BACKEND_API_URL}/api/categories`, {
            headers: {
                Cookie: `accessToken=${accessToken}`
            },
            next: {
                tags: ["catagory"]
            }
        });

        const result = await handleApiResponse(res);
        return result;
    } catch (error) {
        console.error("Get Batch Error:", error);
        return { success: false, message: "Failed to connect to the backend server!", data: [] };
    }
};