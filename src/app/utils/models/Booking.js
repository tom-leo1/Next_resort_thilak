import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    startDate:{
        type:String,
        required:true
    },
    endDate:{
        type:String,
        required:true
    },
    productName:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    offer:{
        type:Number,
    },
    image:{
        type:String,
        required:true
    },
    user:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }],
})

const Booking = mongoose.models.Booking || mongoose.model('Booking',bookSchema);
export default Booking