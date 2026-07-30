"use server"

import { redirect } from "next/navigation"
import { cookies } from "next/headers"
import jwt, { JwtPayload } from "jsonwebtoken"


type LoginState = {
    success : true,
    statusCode : number,
    message : string,
    data : {
        accessToken : string,
        refreshToken : string
    }
}

export const loginAction = async (prevState : LoginState, fromData : FormData)=>{
  console.log(fromData);

  const email = fromData.get("email")
  const password = fromData.get("password")

  const payload = {
    email,
    password
  }

  const res = await fetch("https://rent-nest-nu-hazel.vercel.app/api/auth/login",{
    method: "POST",
    headers: {
      "Content-Type" : "application/json"
    },
    body: JSON.stringify(payload)
  })

  const result = await res.json();
  if(result.success){
    const cookieStore = await cookies()

    cookieStore.set("accessToken", result.data.accessToken,{
      httpOnly: true,
      maxAge: 60*60*24,
      sameSite : "lax",
    })

    
    cookieStore.set("refreshToken", result.data.refreshToken,{
      httpOnly: true,
      maxAge: 60*60*24*7,
      sameSite : "lax",
    })

    const decodedToken = jwt.decode(result.data.accessToken) as JwtPayload;

if (decodedToken.role === "TENANT") {
    redirect("/tenant"); 
} else if (decodedToken.role === "LANDLORD") {
    redirect("/landlord"); 
} else if (decodedToken.role === "ADMIN") {
    redirect("/admin");
}
}





return result
}


export const isAccessTokenExist = async () => {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;
    return token;
};