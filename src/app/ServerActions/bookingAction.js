'use server'
import {NextResponse} from "next/server";
import {auth} from "@/app/auth";
import User from "@/app/utils/models/User";
import Booking from "@/app/utils/models/Booking";


export async function bookingAction(bookingsDetails){
    console.log(bookingsDetails,'thilak');
    const session = await auth()
    const userName = session?.userName
   try {
       const userDetails = await User.findOne({userName})
       if(!userDetails){
           return {success: false, message: 'No user details found.'};
       }
       const userId = await userDetails?._id.toString();
       const bookingDetails = await Booking.create({
           startDate: bookingsDetails.selectedDate.startDate,
           endDate: bookingsDetails.selectedDate.endDate,
           productName: bookingsDetails.record.title,
           price: bookingsDetails.record.price,
           offer: bookingsDetails.record.offer,
           image: bookingsDetails.record.image,
       })
       await User.findByIdAndUpdate(userId,{$push: {bookings: bookingDetails._id}},{new:true});
       return {success: true, bookingDetails: bookingDetails};
   }
   catch (error) {
        console.log(error)
   }
}
