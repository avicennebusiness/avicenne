import React from "react";
import Honey from "./../assets/images/honey-jar.jpg";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Tooltip,
  IconButton,
} from "@material-tailwind/react";
const ProductCard = ({ product }) => {
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
        <Button>Read More</Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;

/*<Card
      sx={{
        width: { xs: "250px", sm: "250px", lg: "300px" },
        height: "500px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <CardActionArea>
        <CardMedia component="img" height="250px" image={Honey} alt="Honey" />
        <CardContent
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "nowrap",
            alignItems: "center",
            marginTop: "25px",
            paddingX: "10px",
            gap: "10px",
          }}
        >
          <Typography gutterBottom variant="h5" component="div">
            {product.name}
          </Typography>
          <Typography variant="h5" color="text.secondary">
            {product.price + " TND"}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions sx={{ justifyContent: "end" }}>
        <Button
          size="small"
          sx={{
            backgroundColor: "#fff",
            color: "#D78C12",
            "&:hover": {
              backgroundColor: "#f5cd8c88",
              color: "#D78C12",
            },
            my: 2,
            borderRadius: "3px",
          }}
        >
          View More
        </Button>
      </CardActions>
        </Card>*/
