'use server'

import connectDB from "@/app/utils/config/connectDB";

export async function productAction(productDetails){
    await  connectDB()
    console.log(productDetails,'productDetails');
}
