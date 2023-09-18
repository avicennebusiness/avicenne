import React, { useState, useEffect, Fragment } from "react";
import { Grid } from "@mui/material";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, DataSnapshot } from "firebase/database";
import Typography from "@mui/material/Typography";
import { AppBar, Toolbar, IconButton, Modal } from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import { useNavigate } from "react-router-dom";
import { HashLink as Link } from "react-router-hash-link";
import ScrollToTop from "../../components/ScrollToTop/ScrollToTop";
import ProductCard from "../../components/productCard";
import "./ProductsPage.css";
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

const ProductsPage = () => {
  const [categories, setCategories] = useState([]);
  const [bestSellers, setBestSellers] = useState([]);
  const [isAppBarVisible, setIsAppBarVisible] = useState(false);

  const toggleAppBar = () => {
    setIsAppBarVisible(!isAppBarVisible);
  };

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
  console.log(window.location.href.split("#")[1]);
  return (
    <Grid
      container
      flexDirection={{ xs: "column", sm: "column", md: "row" }}
      flexWrap="nowrap"
    >
      <Grid item marginBottom={{ xs: "100px", sm: "100px", lg: "0px" }}>
        <Grid item sx={{ display: { xs: "flex", sm: "flex", md: "none" } }}>
          <IconButton
            onClick={toggleAppBar}
            sx={{
              position: "fixed",
              top: "140px",
              right: 0,
              zIndex: 9999,
            }}
          >
            <FilterListIcon />
          </IconButton>
          <Modal
            open={isAppBarVisible}
            onClose={toggleAppBar}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
            }}
          >
            <AppBar
              sx={{
                width: "100%", // Adjust the width as needed

                backgroundColor: "white",
                color: "#202020",
                boxShadow: "none",
                borderRadius: "10px",
                overflow: "hidden",
              }}
            >
              <Toolbar sx={{ flexDirection: "column" }}>
                <Typography
                  sx={{
                    my: 2,
                    color: "#111111",
                    display: "block",
                    fontWeight: "bold",
                    textAlign: "left",
                    fontSize: "24px",
                  }}
                >
                  Categories
                </Typography>
                <Grid
                  container
                  flexDirection="row"
                  gap="15px"
                  alignItems="center"
                  justifyContent="center"
                >
                  {categories.map((category, index) => (
                    <Link
                      style={{ textDecoration: "none" }}
                      to={"#" + index}
                      key={category.name}
                    >
                      <Typography
                        sx={{
                          my: 2,
                          color: "#454545",
                          textAlign: "left",
                          fontWeight: "bold",
                          padding: "5px 10px",
                          border: "1px solid #D78C12",
                          borderRadius: "10px",
                          backgroundColor:
                            window.location.href.split("#")[1] == index
                              ? "#f1b34e"
                              : "white",
                        }}
                      >
                        {category.name}
                      </Typography>
                    </Link>
                  ))}
                </Grid>
              </Toolbar>
            </AppBar>
          </Modal>
        </Grid>
        <AppBar
          sx={{
            height: "80vh",
            maxWidth: "250px",
            marginTop: { xs: "140px", sm: "140px", lg: "190px" },
            paddingTop: "50px",
            backgroundColor: "white",
            color: "#202020",
            marginLeft: { xs: "10px", sm: "10px", lg: "50px" },
            boxShadow: "none",
            position: "sticky",
            display: { xs: "none", sm: "none", md: "flex" },
          }}
        >
          <Toolbar>
            <Grid
              container
              flexDirection="column"
              alignItems="start"
              justifyContent="center"
            >
              <Typography
                sx={{
                  my: 2,
                  color: "#111111",
                  display: "block",
                  fontWeight: "bold",
                  textAlign: "left",
                  fontSize: "24px",
                }}
              >
                Categories
              </Typography>
              {categories.map((category, index) => (
                <Link
                  style={{ textDecoration: "none" }}
                  to={"#" + index}
                  key={category.name}
                >
                  <Typography
                    sx={{
                      my: 2,
                      color: "#454545",
                      textAlign: "left",
                      fontWeight: "bold",
                      textDecoration:
                        window.location.href.split("#")[1] == index
                          ? "underline"
                          : "none",
                    }}
                  >
                    {category.name}
                  </Typography>
                </Link>
              ))}
            </Grid>
          </Toolbar>
        </AppBar>
      </Grid>
      <Grid
        item
        display="flex"
        flexDirection="column"
        gap="50px"
        justifyContent="center"
        alignItems="center"
        padding={{ xs: "25px", sm: "25px", lg: "75px" }}
        sx={{ width: "100%" }}
      >
        {categories.map((category, index) => (
          <Grid
            key={category.name}
            id={index}
            container
            display="flex"
            flexDirection="column"
            gap="25px"
            justifyContent="center"
            alignItems="center"
            sx={{ width: "100%" }}
          >
            <h1 className=" text-3xl font-bold">{category.name}</h1>
            <div className="products-grid">
              {category.products.map((product) => (
                <ProductCard key={product.name} product={product} />
              ))}
            </div>
          </Grid>
        ))}
      </Grid>
      <ScrollToTop />
    </Grid>
  );
};

export default ProductsPage;
