import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Typography, Button } from "@material-tailwind/react";
import Honey from "./../../assets/images/honey-jar.jpg";
import { getProductByName } from "../../firebase/firebase-functions";
const FullProductPage = () => {
  const { name } = useParams();
  const [product, setProduct] = useState(null);
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await getProductByName(name);
        setProduct(response);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
    fetchProduct();
  }, [name]); // Add 'name' as a dependency to re-fetch when it changes
  return (
    product && (
      <div className="container  p-8">
        <div className="flex flex-col md:flex-row items-center md:gap-10 md:items-start justify-start ">
          <div className="md:w-1/2">
            <img
              alt={product.name}
              className="max-w-full   h-auto"
              src={Honey} // Use the actual product image source
            />
          </div>
          <div className="md:w-1/2 md:pl-4">
            <Typography
              variant="h4"
              color="blue-gray"
              className="font-medium mb-2"
            >
              {product.name}
            </Typography>
            <Typography variant="body" color="blue-gray" className="mb-4">
              {product.description}
            </Typography>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-8 md:gap-16 ">
                <div>
                  <Typography
                    variant="small"
                    color="gray"
                    className="font-normal"
                  >
                    Price
                  </Typography>
                  <Typography className="font-medium text-xl md:text-2xl text-[#D58B15]">
                    {product?.price + " TND"}
                  </Typography>
                </div>
              </div>
              <Button>Order One Now</Button>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default FullProductPage;
