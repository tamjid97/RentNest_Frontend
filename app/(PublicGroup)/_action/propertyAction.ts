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
        
        if (accessToken) {
            headers["Authorization"] = `Bearer ${accessToken}`;
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
    
    try {
        const headers: Record<string, string> = {
            "Content-Type": "application/json",
        };
        if (accessToken) {
            headers["Authorization"] = `Bearer ${accessToken}`;
            headers["Cookie"] = `accessToken=${accessToken}`;
        }

        const res = await fetch(`${process.env.BACKEND_API_URL}/api/properties/${id}`, {
            headers,
            cache: "no-store" 
        });

        const result = await handleApiResponse(res);
        


        return result;
    } catch (error) {
        console.error("Get property by ID Error:", error);
        return { success: false, message: "Failed to connect to the backend server!", data: null };
    }
};