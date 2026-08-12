const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export async function getProfileApi() {
  try {
    const res = await fetch(`${BACKEND_URL}/auth/me`, { // অথবা আপনার ব্যাকএন্ড রাউট অনুযায়ী
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const result = await res.json();
    return result;
  } catch (error) {
    console.error("Failed to fetch profile:", error);
    return { success: false, message: "Something went wrong" };
  }
}

export async function updateProfileApi(formData: { name?: string; phoneNumber?: string; profilePhoto?: string }) {
  try {
    const res = await fetch(`${BACKEND_URL}/Profile/update-profile`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
      credentials: "include",
    });

    const result = await res.json();
    return result;
  } catch (error) {
    console.error("Failed to update profile:", error);
    return { success: false, message: "Something went wrong" };
  }
}