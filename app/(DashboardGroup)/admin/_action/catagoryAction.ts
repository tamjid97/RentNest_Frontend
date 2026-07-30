"use server";


import { isAccessTokenExist } from "@/app/(Auth)/_action/loginAction";
import { revalidateTag } from "next/cache";





type CatagoryState = {
    success: boolean;
    statusCode?: number;
    message: string;
    data?: unknown;
};


export const createCatagory = async (prevState: CatagoryState, formData: FormData)=>{

console.log({
  name : formData.get("name")
});


const payload = {
  name : formData.get("name")
}

const accessToken = await isAccessTokenExist()
const res = await fetch(`${process.env.BACKEND_API_URL}/api/categories`,{
    method : "POST",
    headers :{
      cookie: `accessToken=${accessToken}`,
      "Content-Type": "application/json"
    },
    body : JSON.stringify(payload)
  });

  const result = await res.json();

  
    if(result.success){
        revalidateTag("my-posts", {
            expire : 0
        })
    }

    return result
}