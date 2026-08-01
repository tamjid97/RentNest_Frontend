"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export const isAccessTokenExist = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;
  return token;
};


const handleApiResponse = async (res: Response) => {
  const contentType = res.headers.get("content-type");

  
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
  const jsonRes = await res.json();
  return jsonRes;
};

interface ActionResponse {
  success: boolean;
  message?: string;
  data?: unknown;
}

// 1. Create Property Action

export async function createProperty(formData: FormData): Promise<ActionResponse> {
  console.log("[Action] createProperty called 🚀");
  try {
    const title = formData.get("title");
    const location = formData.get("location");
    const price = formData.get("price");
    const image = formData.get("image");
    const isAvailable = formData.get("isAvailable");
    const categoryId = formData.get("categoryId");
    const description = formData.get("description");
    const amenities = formData.getAll("amenities");

    const payload = {
      title: title ? String(title) : "",
      location: location ? String(location) : "",
      price: price ? Number(price) : 0,
      image: image ? String(image) : null,
      isAvailable: isAvailable ? String(isAvailable) : "AVAILABLE",
      categoryId: categoryId ? String(categoryId) : "",
      description: description ? String(description) : "",
      amenities: amenities.map((item) => String(item)),
    };



    const accessToken = await isAccessTokenExist();
    if (!accessToken) {
      return { success: false, message: "User not logged in!" };
    }

    const backendUrl = `${process.env.BACKEND_API_URL}/api/landlord/properties`;


    const response = await fetch(backendUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(payload),
    });

    const result = (await handleApiResponse(response)) as ActionResponse;
    
    if (result.success) {

      revalidateTag("properties", "max");
    }

    return result;
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Something went wrong";
    return { success: false, message: errorMessage };
  }
}


// 2. Get Properties Action

export const getProperties = async () => {

  const accessToken = await isAccessTokenExist();
  
  if (!accessToken) {
    console.error("[Action] getProperties Error: User not logged in!");
    return { success: false, message: "User not logged in!", data: [] };
  }

  try {
    const backendUrl = `${process.env.BACKEND_API_URL}/api/landlord/properties`;


    const res = await fetch(backendUrl, {
      method: "GET",
      headers: {
        Cookie: `accessToken=${accessToken}`,
        "Content-Type": "application/json"
      },
      next: {
        tags: ["properties"]
      }
    });

    const result = await handleApiResponse(res);
    return result;
  } catch (error) {
    console.error("[Action] getProperties Exception Error:", error);
    return { success: false, message: "Failed to connect to the backend server!", data: [] };
  }
};


// 3. Update Property Action

export const updateProperty = async (id: string, formData: FormData) => {

  const rawImage = formData.get("image") as string;
  const defaultImage = "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=600&auto=format&fit=crop";

  const rawPrice = formData.get("price");
  const parsedPrice = rawPrice ? parseInt(rawPrice as string, 10) : 0;
  
  const categoryId = String(formData.get("categoryId") || "").trim();

  if (!categoryId) {
    console.error("[Action] updateProperty Error: Category selection is required!");
    return { success: false, message: "Category selection is required!" };
  }

  const payload = {
    title: String(formData.get("title") || "").trim(),
    description: String(formData.get("description") || "").trim(),
    location: String(formData.get("location") || "").trim(),
    price: isNaN(parsedPrice) ? 0 : parsedPrice,
    amenities: formData.getAll("amenities").map(item => String(item)), 
    categoryId: categoryId,
    isAvailable: String(formData.get("isAvailable") || "AVAILABLE"),
    image: rawImage && rawImage.trim() !== "" ? rawImage : defaultImage,
  };



  const accessToken = await isAccessTokenExist();

  if (!accessToken) {
    console.error("[Action] updateProperty Error: User not logged in!");
    return { success: false, statusCode: 401, message: "User not logged in!", data: {} };
  }

  try {
    const backendUrl = `${process.env.BACKEND_API_URL}/api/landlord/properties/${id}`;

    const res = await fetch(backendUrl, {
      method: "PUT",
      headers: {
        Cookie: `accessToken=${accessToken}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    const result = await handleApiResponse(res);
    
    if (result.success) {
      console.log("[Action] Property updated successfully, revalidating tag");
      revalidateTag("properties", "max"); 
    }
    return result;
  } catch (error) {
    console.error("[Action] updateProperty Exception Error:", error);
    return { success: false, message: "Failed to connect to the backend server!" };
  }
};

// 4. Delete Property Action

export const deleteProperty = async (id: string) => {
  console.log(`[Action] deleteProperty called for ID: ${id} 🗑️`);
  const accessToken = await isAccessTokenExist();

  if (!accessToken) {
    return { success: false, message: "User not logged in!" };
  }

  try {
    const backendUrl = `${process.env.BACKEND_API_URL}/api/landlord/properties/${id}`;


    const res = await fetch(backendUrl, {
      method: "DELETE",
      headers: {
        Cookie: `accessToken=${accessToken}`
      }
    });

    const result = await handleApiResponse(res);

    if (result.success) {
      revalidateTag("properties", "max"); 
    }
    return result;
  } catch (error) {
    return { success: false, message: "Failed to connect to the backend server!" };
  }
};