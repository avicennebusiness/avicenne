import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";
import firebaseConfig from "./firebase-config";

// Initialize Firebase

const firebaseApp = initializeApp(firebaseConfig);
const database = getDatabase(firebaseApp);

const fetchData = () => {
  return new Promise((resolve, reject) => {
    const categoriesRef = ref(database, "Categories");
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

          const allProducts = categoriesArray.flatMap(
            (category) => category.products
          );
          const sortedBestSellers = [...allProducts].sort(
            (a, b) => b.price - a.price
          );

          resolve({ categoriesArray, sortedBestSellers });
        }
      },
      (error) => {
        console.error("Error fetching categories:", error);
        reject(error);
      }
    );
  });
};
const getProductByName = (productName) => {
  return new Promise((resolve, reject) => {
    onValue(
      ref(database, "Categories"), // Assuming you have a "Categories" node in your Firebase database
      (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const foundProduct = Object.values(data)
            .flatMap((category) => Object.values(category))
            .find((product) => product.name === productName);

          if (foundProduct) {
            resolve(foundProduct);
          } else {
            reject(`Product with name '${productName}' not found.`);
          }
        }
      },
      (error) => {
        console.error("Error fetching product:", error);
        reject(error);
      }
    );
  });
};

export { fetchData, getProductByName };
