import {NextResponse} from "next/server";

import connectDB from "@/app/utils/config/connectDB";
import User from "@/app/utils/models/User";


export const GET= async ()=>{
    try {
        await connectDB();
        const users = await User.find({role: {$ne : 'admin'}}, {userPassword: 0})
        return NextResponse.json(users)
    }
    catch (error) {
        console.log(error);
        return NextResponse.json('users not found')
    }
}