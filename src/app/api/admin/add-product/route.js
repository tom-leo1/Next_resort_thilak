import {NextResponse} from "next/server";
import Path from "path";
import {writeFile} from 'fs/promises'
import Product from "@/app/utils/models/Product";
import connectDB from "@/app/utils/config/connectDB";
export async function GET(){
    try {
        await connectDB();
        const products = await Product.find();
        return NextResponse.json(products)
    }
   catch (error) {
        console.log(error);
       return NextResponse.json({status:500})
   }
}

export async function POST(request){
    const productDetails = await request.formData()
    const title = productDetails.get('title');
    const description = productDetails.get('description');
    const price = productDetails.get('price');
    const offer = productDetails.get('offer');
    const amenities = productDetails.get('amenities');
    const image = productDetails.get('image');
    const bufferData = await image.arrayBuffer();
    const buffer = Buffer.from(bufferData);
    const imagePath = Path.join(process.cwd(), 'public/uploads', image.name);
    try {
        await writeFile(imagePath, buffer);
        await connectDB()
        const newProduct = new Product({
            title, description, price, offer, amenities,image:`/uploads/${image.name}`
        })
        await newProduct.save()
        return NextResponse.json({message: 'product successfully saved', status: 201});

    }
    catch(err){
        console.log(err);
        return NextResponse.json({message: 'product added failed', status: 500});
    }
}