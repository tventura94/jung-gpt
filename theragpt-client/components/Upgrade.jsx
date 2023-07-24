import React, { useState, useEffect } from "react";

import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
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
import {
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";
import GoldLogo from "/gpt-gold.png";
import JungLogo from "/will.png";

export default function Upgrade({ setUserEmail, setAuthState, user }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [products, setProducts] = useState([]);
  const [subscriptionStatus, setSubscriptionStatus] = useState(null);
  const [loading, setLoading] = useState(false);
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
    setLoading(true);
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
        price: "price_1NWlUrGx3uwFHp11NFEO6GHt",
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
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-evenly",
          marginTop: "2rem",
          marginBottom: "2rem",
          flexWrap: "wrap",
          margin: isMobile ? "1rem" : "",
        }}
      >
        <Card
          sx={{
            minWidth: { xs: "90vw", sm: 350 }, // 90% of the viewport width on extra small screens, and 350px on small screens and up
            minHeight: 400,
            marginBottom: 2,
            textAlign: "center",
            backgroundColor: "#F8F8F8",
            borderRadius: 20,
            border: "2px gray solid",
          }}
        >
          <CardContent>
            <Typography
              style={{
                marginTop: "4rem",
              }}
              variant="h5"
              component="div"
            >
              Free Tier
            </Typography>

            <img
              style={{
                width: "100%",
              }}
              src={JungLogo}
            ></img>
            <ul style={{ marginTop: "2rem" }}>
              <Typography variant="h6" component="li">
                Access to JungGPT
              </Typography>
              <Typography
                variant="h6"
                component="li"
                style={{ marginTop: "1rem" }}
              >
                Limited Messaging with JungGPT
              </Typography>
              <Typography
                variant="h6"
                component="li"
                style={{ marginTop: "1rem" }}
              >
                Delayed access to new or improved models
              </Typography>
            </ul>
          </CardContent>
        </Card>
        {products.map((product) => (
          <Card
            sx={{
              border: "2px #CB9800 solid",
              minWidth: isMobile ? 280 : 350,
              minHeight: 300,
              marginBottom: 2,
              textAlign: "center",
              backgroundColor: "#F8F8F8",
              borderRadius: 20,
            }}
          >
            <CardContent>
              <Typography
                style={{
                  marginTop: "4rem",
                }}
                variant="h5"
                component="div"
              >
                {product.name}
              </Typography>

              <img
                style={{
                  width: "100%",
                }}
                src={GoldLogo}
              ></img>
              <ul style={{ marginTop: "2rem" }}>
                <Typography variant="h6" component="li">
                  Access to JungGPT & JungSMART
                </Typography>
                <Typography
                  variant="h6"
                  component="li"
                  style={{ marginTop: "1rem" }}
                >
                  {product.description} for all available models
                </Typography>
                <Typography
                  variant="h6"
                  component="li"
                  style={{ marginTop: "1rem" }}
                >
                  First Access to newer and updated models
                </Typography>
              </ul>
            </CardContent>

            <Box sx={{ flexGrow: 1 }} />
            <CardActions sx={{ justifyContent: "center" }}>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#5E7E91",
                  color: "#FFF",
                  "&:hover": { backgroundColor: "#4B697C" },
                  marginBottom: "3rem",
                }}
                onClick={() => handleUpgrade(product.id)}
                disabled={subscriptionStatus === "active" || loading}
              >
                {loading ? (
                  <CircularProgress color="inherit" size={24} />
                ) : (
                  "Upgrade"
                )}
              </Button>
            </CardActions>
          </Card>
        ))}
      </Box>
      {/* <div style={{ textAlign: "center" }}>
        <h1>TEST CHECKOUT - DO NOT USE REAL CARD</h1>
        <p>Instructions:</p>
        <p>
          Click Upgrade. Wait a few moments. You will be redirected to stripe.
          enter card number 4242 4242 4242 4242, exp date 424 security code 424
        </p>
        <p>
          All of the card information should be repeating 4242 until you get to
          name and address, put whichever name and address and hit submit, it
          should process, text me if you're struggling
        </p>
      </div> */}
    </div>
  );
}
