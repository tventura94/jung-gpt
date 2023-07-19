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
  const [subscriptionStatus, setSubscriptionStatus] = useState(null);

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

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "users", user.uid, "subscriptions"),
      (snapshot) => {
        let activeSubs = snapshot.docs
          .map((doc) => ({ id: doc.id, ...doc.data() }))
          .filter((sub) => ["trialing", "active"].includes(sub.status));

        let newSub = activeSubs[0];

        if (newSub) {
          console.log(`Account is ${newSub.status}`);
          setSubscriptionStatus(newSub.status);
        }
      }
    );

    return () => {
      unsubscribe();
    };
  }, [user]);

  const handleUpgrade = async (productId) => {
    const selectedProduct = products.find(
      (product) => product.id === productId
    );

    if (!selectedProduct || !selectedProduct.stripe_price_id) {
      alert("Product or price ID not found!");
      return;
    }

    const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

    const sessionRef = await addDoc(
      collection(db, "users", user.uid, "checkout_sessions"),
      {
        price: selectedProduct.stripe_price_id,
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
      sessionListener();
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

            <button
              onClick={() => handleUpgrade(product.id)}
              disabled={subscriptionStatus === "active"}
            >
              Upgrade
            </button>
            <p>Instructions for test checkout</p>
            <p>
              Enter repeating 4242 throughout the whole card number, so like
              '4242 4242 4242 4242' and then 424 for expiration and 424 for
              security code. Enter whatever name and address and it should
              process.
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
