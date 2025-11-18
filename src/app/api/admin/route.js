
import {NextResponse} from "next/server";
import connectDB from "@/app/utils/config/connectDB";
import Product from "@/app/utils/models/Product";

export async function  GET() {
    try {
        await connectDB()
        const product = await Product.find();
        return NextResponse.json(product)
    } catch (error) {
        console.log(error);
    }
}