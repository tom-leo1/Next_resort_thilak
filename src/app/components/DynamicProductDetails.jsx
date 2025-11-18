'use client'
import React, {useEffect, useState} from 'react';
import Link from "next/link";
import axios from "axios";
import UserNavigation from "@/app/components/UserNavigation";
import CalenderComponent from "@/app/components/CalenderComponent";
import {bookingAction} from "@/app/ServerActions/bookingAction";
import {useRouter} from "next/navigation";


const DynamicProductDetails = ({productId}) => {
    const [record, setRecord] = useState("")
    const [isLoading, setIsLoading] = useState(true);
    const [selectedDate, setSelectedDate] = useState(null);
    const router = useRouter();
    const handleProductDetails = async ()=>{
        setIsLoading(true);
       try {
           const response = await axios.get(`http://localhost:3000/api/admin/get-product/${productId}`);
           setRecord(response?.data);
           setIsLoading(false);
           return response?.data;
       }
       catch (error) {
           console.log(error);
       }
    }
    const handleDatesSelect = async (dates)=>{
        setSelectedDate(dates);
        console.log(dates,'dates');
    }
    const handleBooking = async ()=> {
        if (!selectedDate) {
            alert("Please select a booking");
        }
        const bookingDetails ={record, selectedDate};
        try {
            const response = await bookingAction(bookingDetails);
            if(response.success){
                alert('Booking successfully added');
                router.push('/')
            }
        } catch (error) {
            console.log(error);
        }

    }
    useEffect(()=>{
        handleProductDetails();
    },[])
  return (
    <>
        {
            isLoading ? <center><h1 style={{color:'green'}}>Loading...</h1></center> :
                <>
                    <UserNavigation/>
                    <div>
                        <CalenderComponent onDatesSelect={handleDatesSelect}/>
                        <Link href="/">
                            <p align="center">Go Back</p>
                        </Link>
                        {record?
                            (<div className="">
                                <div className="singleSection">
                                    <div className="singleLeft">
                                        <div className="">
                                            <h2>{record.title}</h2>
                                        </div>
                                        <img src={record.image} alt={record.title} className="singleImage"/>
                                    </div>
                                    <div className="singleCenter">
                                        <div className="singlePrice">Rs.{record.price}</div>
                                        <p className="singleDesc">{record.desc}</p>
                                        <div className="">
                                            {record.amenities.map((item, i)=>{
                                                return(
                                                    <div className="singleAmen"  key={i}>
                                                        <span>*</span> {item}
                                                    </div>
                                                )
                                            })}
                                        </div>
                                        <div className="offer">
                                            <span>*</span>
                                            <button>  Discount {record.offer}</button>
                                        </div>
                                        <div className="singleBtn">
                                            <button className=""  onClick={handleBooking} >Book Now</button>
                                        </div>
                                    </div>
                                </div>

                            </div>)
                            :<h1 style={{position:'absolute', top:'50%', left:'50%'}}>
                                {/*    <Circles*/}
                                {/*    height="80"*/}
                                {/*    width="80"*/}
                                {/*    color="#4fa94d"*/}
                                {/*    ariaLabel="circles-loading"*/}
                                {/*    wrapperStyle={{}}*/}
                                {/*    wrapperClass=""*/}
                                {/*    visible={true}*/}
                                {/*/>*/}
                            </h1>}
                    </div>
                </>
        }

    </>
  );
};

export default DynamicProductDetails;
