import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    userName:{
        type: String,
        required: true,
    },
    userEmail:{
        type: String,
        required: true
    },
    userPassword: {
        type: String,
        required: true,
    },
    role:{
        type:String,
        default:'user',
    },
    bookings:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:'Booking'
        }
    ]
})

const User = mongoose.models.User || mongoose.model('User',userSchema)
export default User