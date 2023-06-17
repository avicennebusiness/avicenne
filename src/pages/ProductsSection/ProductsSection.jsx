import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, DataSnapshot } from "firebase/database";

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
  useEffect(() => {
    const categoriesRef = ref(database, "categories");
    const fetchCategories = () => {
      onValue(
        categoriesRef,
        (snapshot) => {
          const data = snapshot.val();
          if (data) {
            const categoriesArray = Object.entries(data).map(
              ([categoryId, category]) => ({
                id: categoryId,
                name: category.name,
                products: Object.entries(category.products).map(
                  ([productId, product]) => ({
                    id: productId,
                    ...product,
                  })
                ),
              })
            );
            setCategories(categoriesArray);
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
    <div>
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Hi Welcome
      </h1>
      <Button>Hi</Button>
      <div>
        <h1>Categories</h1>
        {categories.map((category) => (
          <div key={category.id}>
            <h2>{category.name}</h2>
            <ul>
              {category.products.map((product) => (
                <li key={product.id}>
                  <h3>{product.name}</h3>
                  <p>{product.description}</p>
                  <p>Price: ${product.price}</p>
                  <img src={product.image} alt={product.name} />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsSection;
