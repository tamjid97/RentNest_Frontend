"use server"

import { cookies } from "next/headers"
import jwt, { JwtPayload } from "jsonwebtoken"

export type LoginState = {
    success?: boolean;
    statusCode?: number;
    message?: string;
    role?: string;
    data?: {
        accessToken: string;
        refreshToken: string;
    }
}

export const loginAction = async (prevState: LoginState, formData: FormData): Promise<LoginState> => {
  const email = formData.get("email")
  const password = formData.get("password")

  const payload = { email, password }

  try {
    const res = await fetch("https://rent-nest-nu-hazel.vercel.app/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type" : "application/json"
      },
      body: JSON.stringify(payload)
    })

    const result = await res.json();

    if(result.success){
      const cookieStore = await cookies()

      cookieStore.set("accessToken", result.data.accessToken, {
        httpOnly: true,
        maxAge: 60*60*24,
        sameSite : "lax",
      })
      
      cookieStore.set("refreshToken", result.data.refreshToken, {
        httpOnly: true,
        maxAge: 60*60*24*7,
        sameSite : "lax",
      })

      const decodedToken = jwt.decode(result.data.accessToken) as JwtPayload;
      
      return { ...result, role: decodedToken?.role };
    }

    return result;
  } catch (error) {
    return { success: false, message: "An unexpected error occurred." };
  }
}

export const isAccessTokenExist = async () => {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;
    return token;
};