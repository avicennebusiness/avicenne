import React, { useState, useEffect, useRef } from "react";
import { Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { HashLink as Link } from "react-router-hash-link";
import ScrollToTop from "../../components/ScrollToTop/ScrollToTop";
import ProductCard from "../../components/productCard";
import {
  Card,
  List,
  ListItem,
  Drawer,
  Typography,
} from "@material-tailwind/react";

import "./ProductsPage.css";
import ProductDialog from "../../components/ProductDialog";
import FilterButton from "../../components/FilterButton";
import { fetchData } from "../../firebase/firebase-functions";

const ProductsPage = () => {
  const [categories, setCategories] = useState([]);
  const [bestSellers, setBestSellers] = useState([]);
  const [isAppBarVisible, setIsAppBarVisible] = useState(false);

  const toggleAppBar = () => {
    setIsAppBarVisible(!isAppBarVisible);
  };

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetchData();
      setCategories(response.categoriesArray);
      setBestSellers(response.sortedBestSellers);
    };

    fetchCategories();
  }, []);

  const SideBarContent = ({ Drawer }) => {
    const [activeCategory, setActiveCategory] = useState(null);
    const handleClick = (ind) => {
      setActiveCategory(ind);
    };
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
            onClick={
              Drawer
                ? closeDrawer
                : () => {
                    handleClick(index);
                  }
            }
            className={`transition-colors duration-300  rounded-md ${
              activeCategory === index
                ? "bg-[#212121] text-white rounded-md"
                : ""
            }`}
          >
            <ListItem>
              <Typography
                sx={{
                  my: 2,
                  color: "#454545",
                  textAlign: "left",
                  fontWeight: "bold",
                  backgroundColor:
                    window.location.href.split("#")[1] == index
                      ? "red"
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
  const [openDialog, setOpenDialog] = React.useState(false);
  const [selectedProduct, setSelectedProduct] = React.useState(null);

  const closeDrawer = () => setOpen(false);

  const handleOpen = () => setOpen((cur) => !cur);
  const handleOpenDialog = (product) => {
    setOpenDialog((cur) => !cur);
    setSelectedProduct(product);
  };
  const cardRef = useRef(window);

  return (
    <Grid
      container
      flexDirection={{ xs: "column", sm: "column", md: "row" }}
      flexWrap="nowrap"
    >
      <Drawer open={open} onClose={closeDrawer} className="p-4">
        <SideBarContent Drawer={true} />
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
                    <ProductCard
                      key={product.name}
                      product={product}
                      handleOpenDialog={handleOpenDialog}
                    />
                  ))}
                </div>
              </Grid>
            ))}
          </Grid>

          <ScrollToTop cardRef={cardRef} />
        </Card>
      </div>
      <FilterButton handleOpen={handleOpen} />
      <ProductDialog
        selectedProduct={selectedProduct}
        openDialog={openDialog}
        handleOpenDialog={handleOpenDialog}
      />
    </Grid>
  );
};

export default ProductsPage;
