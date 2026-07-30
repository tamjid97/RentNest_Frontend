"use server";

import { cookies } from "next/headers";

type ResponseState = {
    success: boolean;
    statusCode?: number;
    message: string;
    data?: unknown;
};

// ল্যান্ডলর্ডের প্রপার্টির জন্য আসা সমস্ত রেন্টাল রিকোয়েস্ট গেট করার সার্ভার অ্যাকশন
export async function getLandlordRentalRequestsAction(): Promise<ResponseState> {
    try {
        const cookieStore = await cookies();
        const accessToken = cookieStore.get("accessToken")?.value;

        if (!accessToken) {
            return {
                success: false,
                message: "Unauthorized! Please login first.",
            };
        }

        const res = await fetch(`${process.env.BACKEND_API_URL}/api/landlord/requests`, {
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

// রেন্টাল রিকোয়েস্ট Approve বা Reject করার সার্ভার অ্যাকশন
export async function updateRentalRequestStatusAction(
    requestId: string,
    status: "APPROVED" | "REJECTED"
): Promise<ResponseState> {
    try {
        const cookieStore = await cookies();
        const accessToken = cookieStore.get("accessToken")?.value;

        if (!accessToken) {
            return {
                success: false,
                message: "Unauthorized! Please login first.",
            };
        }

        const res = await fetch(`${process.env.BACKEND_API_URL}/api/landlord/requests/${requestId}`, {
            method: "PATCH", 
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify({ status }),
        });

        const textResponse = await res.text();
        let result;
        try {
            result = JSON.parse(textResponse);
        } catch (e) {
            return {
                success: res.ok,
                message: textResponse || `Request successfully ${status.toLowerCase()}.`,
                data: textResponse,
            };
        }

        return result;
    } catch (error) {
        console.error("Update rental status error:", error);
        return {
            success: false,
            message: "Something went wrong while updating request status.",
        };
    }
}