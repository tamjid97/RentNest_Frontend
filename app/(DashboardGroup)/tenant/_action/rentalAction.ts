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
        let result;
        try {
            result = JSON.parse(textResponse);
        } catch (e) {
            return {
                success: res.ok,
                message: textResponse || "Rental requests fetched successfully.",
                data: textResponse,
            };
        }

        return result;
    } catch (error) {
        console.error("Get rental requests error:", error);
        return {
            success: false,
            message: "Something went wrong while fetching requests.",
        };
    }
}

