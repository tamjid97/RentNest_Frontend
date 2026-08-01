"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const pay = async (rentalRequestId: string) => {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value || null;
        
    if (!accessToken) {
        return {
            success: false,
            message: "User not logged in!"
        };
    }
    
    const res = await fetch(`${process.env.BACKEND_API_URL}/api/payments/create`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Cookie: `accessToken=${accessToken}`
        },
        body: JSON.stringify({ rentalRequestId }) 
    });
    
    const result = await res.json();
    
    if (result.success && result.data.paymentUrl) {
        redirect(result.data.paymentUrl);
    }

    return result;
};