import React, { useState, useEffect, Fragment } from "react";
import { Grid } from "@mui/material";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, DataSnapshot } from "firebase/database";
import Honey from "@/assets/images/honey-jar.jpg";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

const firebaseConfig = {
  // Your Firebase configuration
  apiKey: "AIzaSyDz8ImWVqIxTrw8SMQmPDEzvix6O5pfmEs",
  authDomain: "avicenne-2f52b.firebaseapp.com",
  databaseURL: "https://avicenne-2f52b-default-rtdb.firebaseio.com",
  projectId: "avicenne-2f52b",
  storageBucket: "avicenne-2f52b.appspot.com",
  messagingSenderId: "928490117933",
  appId: "1:928490117933:web:32c1eb4a46332bcb86d1a4",
  measurementId: "G-25CRWWZQF1",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const database = getDatabase(firebaseApp);

const ProductsSection = () => {
  const [categories, setCategories] = useState([]);
  const [bestSellers, setBestSellers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const categoriesRef = ref(database, "Categories");

    const fetchCategories = () => {
      onValue(
        categoriesRef,
        (snapshot) => {
          const data = snapshot.val();
          if (data) {
            const categoriesArray = Object.entries(data).map(
              ([categoryName, products]) => ({
                name: categoryName,
                products: Object.entries(products).map(
                  ([productName, product]) => ({
                    name: productName,
                    ...product,
                  })
                ),
              })
            );
            setCategories(categoriesArray);

            const allProducts = categoriesArray.flatMap(
              (category) => category.products
            );
            const sortedBestSellers = [...allProducts].sort(
              (a, b) => b.price - a.price
            );
            setBestSellers(sortedBestSellers);
          }
        },
        (error) => {
          console.error("Error fetching categories:", error);
        }
      );
    };

    fetchCategories();
  }, []);

  return (
    <Grid
      container
      display="flex"
      flexDirection="column"
      gap="50px"
      justifyContent="center"
      alignItems="center"
      padding={{ xs: "25px", sm: "25px", lg: "75px" }}
    >
      <Grid
        container
        display="flex"
        flexDirection="column"
        gap="25px"
        justifyContent="center"
        alignItems="center"
      >
        <h1>Best Sellers</h1>
        <Grid
          display="flex"
          justifyContent="center"
          alignItems="center"
          gap="40px"
          flexDirection={{ xs: "column", sm: "row", lg: "row" }}
          width={{ xs: "100%", sm: "95%", lg: "95%" }}
          flexWrap="wrap"
        >
          {bestSellers.slice(0, 3).map((product) => (
            <Grid key={product.name}>
              <Card
                sx={{
                  width: { xs: "250px", sm: "250px", lg: "300px" },
                  height: "500px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="250px"
                    image={Honey}
                    alt="Honey"
                  />
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
              </Card>
            </Grid>
          ))}
        </Grid>
        <Link
          style={{
            color: "#D78C12",
            borderBottom: "2px dashed #D78C12",
            textDecoration: "none",
          }}
          to="/avicenne/products"
        >
          View All
        </Link>
      </Grid>
      <Grid
        container
        display="flex"
        flexDirection="column"
        gap="25px"
        justifyContent="center"
        alignItems="center"
      >
        <h1>Honey</h1>
        <Grid
          display="flex"
          alignItems="center"
          flexWrap="wrap"
          justifyContent="center"
          gap="40px"
          flexDirection={{ xs: "column", sm: "row", lg: "row" }}
          width={{ xs: "100%", sm: "95%", lg: "95%" }}
        >
          {categories.map(
            (category) =>
              category.name === "Miels" && (
                <Fragment key={category.name}>
                  {category.products.slice(0, 3).map((product) => (
                    <Grid key={product.name}>
                      <Card
                        sx={{
                          width: { xs: "250px", sm: "250px", lg: "300px" },
                          height: "500px",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "space-between",
                        }}
                      >
                        <CardActionArea>
                          <CardMedia
                            component="img"
                            height="250px"
                            image={Honey}
                            alt="Honey"
                          />
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
                            <Typography
                              gutterBottom
                              variant="h5"
                              component="div"
                            >
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
                      </Card>
                    </Grid>
                  ))}
                </Fragment>
              )
          )}
        </Grid>
        <Link
          style={{
            color: "#D78C12",
            borderBottom: "2px dashed #D78C12",
            textDecoration: "none",
          }}
          to="/avicenne/products"
        >
          View All
        </Link>
      </Grid>
    </Grid>
  );
};

export default ProductsSection;
