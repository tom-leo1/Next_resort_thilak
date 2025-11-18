'use client'
import React, {useEffect, useState} from 'react';
import axios from "axios";
import Link from "next/link";

const ProductCollections = () => {
    const [collections, setCollections] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const handleCollections = async ()=>{
        setIsLoading(true);
       try {
           const response = await axios.get('https://next-resort-thilak.vercel.app/api/admin')
           setCollections(response?.data)
           console.log(response?.data);
           setIsLoading(false);
           return response?.data;
       }
       catch (error) {
           console.log(error);
       }
    }
    useEffect(()=>{
        handleCollections();
    },[])
  return (
    <>
        {
            isLoading ? <center><h1 style={{color:'green'}}>Loading...</h1></center>
                :
                <>
                    <div className="productSection">
                        <h1 align="center">Select your Stay</h1>
                        {collections ? (
                            collections?.map(item => {
                                return (
                                    <div key={item._id} className="proDetail">
                                        <div className="left">
                                            <div className="title">{item.title}</div>
                                            <br />
                                            <img src={item.image} alt={item.title} className="roomImage" />
                                        </div>
                                        <div className="center">
                                            <div className="pamen">
                                                <h2 className="price">Rs. {item.price}</h2>
                                                <div>
                                                    <h3>Amenities</h3>
                                                    {item.amenities.map((serve, i) => {
                                                        return (
                                                            <div className="amenities" key={i}>
                                                                <div>*{serve}</div>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                            <div className="right">
                                                <Link href={`/productDetails/${item._id}`}>
                                                    <button className="detail">Details </button>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    height: "50vh",
                                }}
                            >
                                {/*<Circles*/}
                                {/*    height="80"*/}
                                {/*    width="80"*/}
                                {/*    color="#4fa94d"*/}
                                {/*    ariaLabel="circles-loading"*/}
                                {/*    wrapperStyle={{}}*/}
                                {/*    wrapperClass=""*/}
                                {/*    visible={true}*/}
                                {/*/>*/}
                            </div>
                        )}
                    </div>
                </>
        }

    </>
  );
};

export default ProductCollections;
