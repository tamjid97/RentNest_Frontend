"use server";

import { cookies } from "next/headers";

export async function createPropertyReview(data: {
  propertyId: string;
  rating: number;
  comment: string;
}) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value || "";

    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000/api/v1";

    const response = await fetch(`${backendUrl}/reviews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    return result;
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Failed to submit review.";
    return {
      success: false,
      message: errorMessage,
    };
  }
}