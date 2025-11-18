import User from "@/app/utils/models/User";
import {NextResponse} from "next/server";
import connectDB from "@/app/utils/config/connectDB";
import Booking from "@/app/utils/models/Booking";

export async function  GET(request, {params}){
    const {id} = await params

    try {
        await connectDB()
        const user = await User.findById(id).populate('bookings');
        return NextResponse.json(user)
    }
    catch (error) {
        console.log(error);
        return NextResponse.json('failed to fetch')
    }
}