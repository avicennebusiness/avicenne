import React from "react";
import Honey from "./../assets/images/honey-jar.jpg";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
const ProductCard = ({ product, handleOpenDialog }) => {
  return (
    <Card className="h-full w-full max-w-[26rem] shadow-lg justify-between">
      <CardHeader floated={false} color="blue-gray">
        <img src={Honey} alt="product-img" />
        <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-tr from-transparent via-transparent to-blue-gray-300/60 " />
      </CardHeader>
      <CardBody>
        <div className="mb-3 flex items-center justify-between">
          <Typography variant="h5" color="blue-gray" className="font-medium">
            {product.name}
          </Typography>
          <Typography color="blue-gray" className="font-normal w-fit">
            {product.price + " TND"}
          </Typography>
        </div>
        <Typography color="gray">{product.description}</Typography>
      </CardBody>
      <CardFooter className="pt-0 self-end ">
        <Button onClick={() => handleOpenDialog(product)}>Read More</Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
