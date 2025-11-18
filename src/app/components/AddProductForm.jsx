'use client'
import React, {useState} from 'react';
import admin from './components.module.css'
import {productAction} from "@/app/ServerActions/productAction";
import axios from "axios";
import {redirect} from "next/navigation";

const AddProductForm = () => {
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [offer, setOffer] = useState("");
    const [amen, setAmen] = useState("");
    const [desc, setDesc] = useState("");
    const [image, setImage] = useState("")
    const recordHandler = async (e) => {
        e.preventDefault()
        const productDetails = {
            title: title,
            price: price,
            offer: offer,
            amenities: amen,
            description: desc,
            image: image
        }
        const data = await new FormData()
        data.append("title", productDetails.title)
        data.append("price", productDetails.price)
        data.append("offer", productDetails.offer)
        data.append("amenities", productDetails.amenities)
        data.append("description", productDetails.description)
        data.append("image", productDetails.image)
        try {
            // await productAction(productDetails)
            const response = await axios.post('http://localhost:3000/api/admin/add-product', data)
            console.log(response,'add procdut response')
            setTitle('')
            setOffer('')
            setAmen('')
            setDesc('')
            setImage('')
            setPrice('')
            if(response.status === 200) {
               alert('resort details added successfully')
            }
        }
        catch (error) {
            console.log(error);
        }

    }
    return (
        <>
            <div className={admin.container}>
                <h1>Add Record</h1>
                <form onSubmit={recordHandler} encType='multipart/form-data'>
                    <div className={admin.fields}>
                        <div className="">
                            <h3>Title</h3>
                            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}/>
                        </div>
                        <div>
                            <h3>Price</h3>
                            <input type="number" value={price} onChange={(e) => setPrice(e.target.value)}/>
                        </div>
                    </div>
                    <div className={admin.fields}>
                        <div className="">
                            <h3>Offer</h3>
                            <input type="number" value={offer} onChange={(e) => setOffer(e.target.value)}/>
                        </div>
                        <div className="">
                            <h3>Amenities</h3>
                            <input type="text" value={amen} onChange={(e) => setAmen(e.target.value)}/>
                        </div>
                    </div>
                    <div className={admin.textField}>
                        <h3>Description</h3>
                        <textarea type="text" rows="5" value={desc} onChange={(e) => setDesc(e.target.value)}/>
                    </div>
                    <div className={admin.textField}>
                        <h3>Upload Image</h3>
                        <input type="file" accept='image/*' onChange={(e) => setImage(e.target.files[0])}/>
                    </div>
                    <div className={admin.submit}>
                        <button type='submit'>
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default AddProductForm;
