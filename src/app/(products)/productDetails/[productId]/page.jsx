import React from 'react';
import DynamicProductDetails from "@/app/components/DynamicProductDetails";

const DynamicProduct = async  ({params}) => {
    const {productId} = await params
    console.log(productId,'productId');
  return (
    <>
     <DynamicProductDetails productId={productId}/>
    </>
  );
};

export default DynamicProduct;
