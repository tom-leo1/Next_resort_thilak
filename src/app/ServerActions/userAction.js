'use server'
import User from "@/app/utils/models/User.js";
import connectDB from "@/app/utils/config/connectDB";


export async function registerAction(registerDetails){
   const {userName, userPassword, userEmail} = registerDetails
    await connectDB()
    try {
        await User.create({userName, userPassword, userEmail})
        return {status: "success"}
    }
    catch (error) {
        console.log(error.message);
    }

}