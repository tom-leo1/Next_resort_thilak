import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
    },
    price:{
        type: Number,
        required: true,
    },
    offer:{
        type: Number,
        required: true,
    },
    amenities:{
        type: [String],
        required: true,
        default:['AC','TV','Wi-Fi','Elevator','Break-fast'],
        set: function (amenities){
            const defaultValues = ['AC','TV','Wi-Fi','Elevator','Break-fast']
            if(typeof amenities === 'string'){
                amenities = amenities.split(',').map(item=>item.trim());
            }
            return Array.from(new Set([...defaultValues, ...amenities]))
        }
    },
    description:{
        type: String,
        required: true,

    },
    image:{
        type: String,
        required: true,
    }

})

const Product = mongoose.models.Product || mongoose.model('Product',productSchema);
export default Product
