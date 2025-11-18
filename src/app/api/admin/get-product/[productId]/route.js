
import {NextResponse} from "next/server";
import connectDB from "@/app/utils/config/connectDB";
import Product from "@/app/utils/models/Product";

export async function  GET(request, {params}){
    const {productId} = await params
    try {
        await connectDB()
        const product = await Product.findById(productId);
        return NextResponse.json(product)
    }
    catch (error) {
        console.log(error);
    }
}