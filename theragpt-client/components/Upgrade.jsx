import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  collection,
  where,
  query,
  getDocs,
  doc,
  addDoc,
  onSnapshot,
  getDoc,
} from "firebase/firestore";
import { db } from "./Fire";
import MenuPopupState from "./MenuPopup";

export default function Upgrade({ setUserEmail, setAuthState, user }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const productsQuery = query(
        collection(db, "products"),
        where("active", "==", true)
      );

      const productSnapshot = await getDocs(productsQuery);
      const products = productSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setProducts(products);
    };

    fetchProducts();
  }, []);

  const handleUpgrade = async (productId) => {
    // Find the selected product by its ID
    const selectedProduct = products.find(
      (product) => product.id === productId
    );

    // Check if the product and its stripe_price_id are found
    if (!selectedProduct || !selectedProduct.stripe_price_id) {
      alert("Product or price ID not found!");
      return;
    }

    const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

    const sessionRef = await addDoc(
      collection(db, "users", user.uid, "checkout_sessions"),
      {
        price: selectedProduct.stripe_price_id, // Use the selected product's Stripe price ID
        success_url: window.location.href,
        cancel_url: window.location.href,
      }
    );

    const sessionSnapshot = await getDoc(sessionRef);
    const sessionId = sessionSnapshot.id;

    const sessionListener = onSnapshot(
      doc(db, "users", user.uid, "checkout_sessions", sessionId),
      (sessionDoc) => {
        const { error, url } = sessionDoc.data();
        if (error) {
          alert(`An error occurred: ${error.message}`);
        } else if (url) {
          window.location.href = url;
        }
      }
    );

    return () => {
      sessionListener(); // Cleanup the listener when the component unmounts
    };
  };

  return (
    <div>
      <div className="main">
        <MenuPopupState
          setUser={setUserEmail}
          setAuthState={setAuthState}
          user={user}
        />
      </div>
      <div>
        {products.map((product) => (
          <div key={product.id}>
            <h1> TEST MODE - NOT A REAL CHECKOUT! </h1>
            <h2>{product.name}</h2>
            <p>{product.description}</p>

            <button onClick={() => handleUpgrade(product.id)}>Upgrade</button>
          </div>
        ))}
      </div>
    </div>
  );
}
