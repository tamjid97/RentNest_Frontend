"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

type RentalResponseState = {
    success: boolean;
    statusCode?: number;
    message: string;
    data?: unknown;
};

interface RentalPayload {
    propertyId: string;
    rentStartDate: string;
    rentEndDate: string;
}

export async function createRentalRequestAction(payload: RentalPayload): Promise<RentalResponseState> {
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
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify(payload),
        });

        // প্রথমে রেসপন্সটি টেক্সট হিসেবে পড়া হচ্ছে যাতে JSON ক্র্যাশ না করে
        const textResponse = await res.text();

        let result;
        try {
            result = JSON.parse(textResponse);
        } catch (e) {
            // যদি রেসপন্সটি ভ্যালিড JSON না হয়ে প্লেন টেক্সট বা আইডি হয়
            if (res.ok) {
                revalidatePath(`/properties/${payload.propertyId}`);
            }
            return {
                success: res.ok,
                message: textResponse || "Rental request processed.",
                data: textResponse,
            };
        }

        if (result.success) {
            revalidatePath(`/properties/${payload.propertyId}`);
        }
        return result;
    } catch (error) {
        console.error("Rental request error:", error);
        return {
            success: false,
            message: "Something went wrong. Please try again.",
        };
    }
}