import React, { useState, useEffect, Fragment, useRef } from "react";
import { Grid } from "@mui/material";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, DataSnapshot } from "firebase/database";
import { AppBar, Toolbar, IconButton, Modal } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { HashLink as Link } from "react-router-hash-link";
import ScrollToTop from "../../components/ScrollToTop/ScrollToTop";
import ProductCard from "../../components/productCard";
import Fab from "@mui/material/Fab";
import FilterListIcon from "@mui/icons-material/FilterList";
import {
  Card,
  List,
  ListItem,
  Drawer,
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  Typography,
  MenuItem,
} from "@material-tailwind/react";

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
  const SideBarContent = () => {
    const navigate = useNavigate();
    return (
      <List className="flex flex-col  h-full overflow-y-auto">
        <div className="mb-2 p-4">
          <Typography variant="h5" color="blue-gray">
            Categories
          </Typography>
        </div>
        {categories.map((category, index) => (
          <Link
            style={{ textDecoration: "none" }}
            to={"#" + index}
            key={category.name}
          >
            <ListItem>
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
            </ListItem>
          </Link>
        ))}
      </List>
    );
  };

  const [open, setOpen] = React.useState(false);

  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);

  const [openD, setOpenD] = React.useState(false);

  const handleOpen = () => setOpen((cur) => !cur);
  const cardRef = useRef(window);
  useEffect(() => {
    console.log("cardRef value:", cardRef.current);
  }, [cardRef]);
  return (
    <Grid
      container
      flexDirection={{ xs: "column", sm: "column", md: "row" }}
      flexWrap="nowrap"
    >
      <Drawer open={open} onClose={closeDrawer} className="p-4">
        <SideBarContent />
      </Drawer>
      <div className="flex flex-row w-full gap-1 fixed m-2 h-screen">
        <Card className="hidden lg:block h-[calc(100vh-5.5rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/3 rounded-md">
          <SideBarContent />
        </Card>
        <Card
          ref={cardRef}
          className="flex-1 overflow-y-scroll p-4 rounded-md mr-2 h-full scroll-smooth"
          style={{ maxHeight: "calc(100vh - 5.5rem)" }}
        >
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

          <ScrollToTop cardRef={cardRef} />
        </Card>
      </div>
      <div
        style={{
          position: "fixed",
          bottom: "2rem",
          left: "2rem",
          zIndex: 9999,
        }}
        className="block lg:hidden "
      >
        <Fab onClick={handleOpen}>
          <FilterListIcon />
        </Fab>
      </div>

      <Dialog size="xs" open={openD} handler={handleOpen}>
        <DialogHeader className="justify-between">
          <Typography variant="h5" color="blue-gray">
            Connect a Wallet
          </Typography>
          <IconButton
            color="blue-gray"
            size="sm"
            variant="text"
            onClick={handleOpen}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </IconButton>
        </DialogHeader>
        <DialogBody className="overflow-y-scroll pr-2">
          <div className="mb-6">
            <Typography
              variant="small"
              color="gray"
              className="font-semibold opacity-70"
            >
              Popular
            </Typography>
            <ul className="mt-1 -ml-2 flex flex-col gap-1">
              <MenuItem className="flex items-center gap-3">
                <img
                  src="/icons/metamask.svg"
                  alt="metamast"
                  className="h-6 w-6"
                />
                <Typography color="blue-gray" variant="h6">
                  MetaMask
                </Typography>
              </MenuItem>
              <MenuItem className="flex items-center gap-3">
                <img
                  src="/icons/coinbase.svg"
                  alt="metamast"
                  className="h-6 w-6 rounded-md"
                />
                <Typography color="blue-gray" variant="h6">
                  Coinbase Wallet
                </Typography>
              </MenuItem>
            </ul>
          </div>
        </DialogBody>
      </Dialog>
    </Grid>
  );
};

export default ProductsPage;
