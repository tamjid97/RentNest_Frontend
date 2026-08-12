const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

// প্রোফাইল ডাটা আনার ফাংশন
export async function getProfileApi() {
  try {
    const res = await fetch(`${BACKEND_URL}/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // কুকি বা টোকেন পাঠানোর জন্য
    });

    const result = await res.json();
    return result;
  } catch (error) {
    console.error("Failed to fetch profile:", error);
    return { success: false, message: "Something went wrong" };
  }
}

// প্রোফাইল আপডেট করার ফাংশন
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