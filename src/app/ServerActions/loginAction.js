'use server'
import connectDB from "@/app/utils/config/connectDB";
import {signIn} from "@/app/auth";



export async function loginAction(loginDetails) {
    await connectDB()
    try {
        await signIn('credentials',{
            userEmail: loginDetails?.userEmail,
            userPassword: loginDetails?.userPassword,
            redirect:false
        })
        return {success: true}
    }
    catch (error) {
        console.log(error);
        return {success: false}
    }
}