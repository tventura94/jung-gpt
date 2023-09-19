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
  TextField,
  Divider,
  InputAdornment,
  Grid,
} from "@mui/material";
import GoldLogo from "/gpt-gold.png";
import JungLogo from "/will.png";
import { logPageView } from "../components/Fire";
import Harvard from "/harvard2.jpg";
import SAPP from "/SAPP.png";
import Choose from "/chooseus.png";
import Pricing from "/pricing.jpg";
import Over80 from "/Over80.png";
import Psy from "/PSY.PNG";

export default function Upgrade({ setUserEmail, setAuthState, user }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [products, setProducts] = useState([]);
  const [subscriptionStatus, setSubscriptionStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const [amount, setAmount] = React.useState(0);
  const sessions = (amount / 0.6).toFixed(0);
  const tokens = (amount / 0.00006).toFixed(0);

  const handleChange = (e) => {
    setAmount(e.target.value);
  };

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
          setSubscriptionStatus(newSub.status);
        }
      }
    );

    return () => {
      unsubscribe();
    };
  }, [user]);
  useEffect(() => {
    logPageView("/Upgrade");
  }, []);
  const handleUpgrade = async (productId) => {
    setLoading(true);
    const selectedProduct = products.find(
      (product) => product.id === productId
    );

    if (!selectedProduct || !selectedProduct.stripe_price_id) {
      alert("Product or price ID not found!");
      return;
    }

    const sessionRef = await addDoc(
      collection(db, "users", user.uid, "checkout_sessions"),
      {
        price: "price_1NdN86Gx3uwFHp11LgNZsS1d",
        success_url: window.location.href,
        cancel_url: window.location.href,
        allow_promotion_codes: true,
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
    <div className="jung-background-2 ">
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
          marginTop: isMobile ? "0rem" : "-2rem",
          marginBottom: "2rem",
          flexWrap: "wrap",
          margin: isMobile ? "1rem" : "",
          backgroundPositionY: "2.3%",
        }}
        className={isMobile ? "" : "jung-background-3"}
      >
        <Box
          sx={{
            textAlign: "center",
            marginTop: "2rem",
            marginBottom: "2rem",
            padding: "1rem",
            border: "1px solid #ccc",
            borderRadius: "8px",
          }}
        >
          <Typography
            variant="body1"
            component="p"
            style={{
              marginTop: "1rem",
              fontSize: "60px",
              fontFamily: "League Spartan",
            }}
          >
            Thinking about <span style={{ color: "#6093CF" }}>Upgrading?</span>
          </Typography>
          <Typography
            sx={{
              marginTop: "1rem",
              fontSize: "30px",
              fontFamily: "League Spartan",
            }}
          >
            Awesome! We're so excited for you to join our community!
          </Typography>
          <img
            style={{
              width: isMobile ? "90%" : "40%",
            }}
            src={Choose}
          ></img>
          <Grid
            container
            spacing={isMobile ? 2 : 3}
            style={{
              marginBottom: "3rem",
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              margin: "0 auto",
              justifyContent: "center",
            }}
          >
            <Grid item xs={11} sm={6} md={4} lg={3}>
              <Box
                sx={{
                  padding: "1rem",
                  textAlign: "center",
                  boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
                  borderRadius: "8px",
                }}
              >
                <Grid
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    margin: "0 auto",
                    justifyContent: "center",
                    alignItems: "center",
                    marginBottom: "1rem",
                  }}
                >
                  <img
                    src={Psy}
                    style={{
                      width: "40%",
                    }}
                  ></img>
                  <Typography
                    sx={{
                      width: isMobile ? "90%" : "100%",
                      textAlign: "center",
                      margin: "0 auto",
                      fontFamily: "Montserrat",
                    }}
                  >
                    At JungGPT, we've had the privilege of consulting with a
                    team of psychologists who have completed Ivy-League
                    Fellowships, taught multiple psychology courses in
                    undergraduate and graduate programs, and directed psychology
                    training programs. These seasoned experts have contributed
                    their deep insights to the careful design of our
                    conversational prompts, ensuring they meet high ethical and
                    psychological standards.
                  </Typography>
                </Grid>
              </Box>
            </Grid>
            <Grid item xs={11} sm={6} md={4} lg={3}>
              <Box
                sx={{
                  padding: "1rem",
                  textAlign: "center",
                  boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
                  borderRadius: "8px",
                }}
              >
                <Grid
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    margin: "0 auto",
                    justifyContent: "center",
                    alignItems: "center",
                    marginBottom: "1rem",
                  }}
                >
                  <img
                    src={SAPP}
                    style={{
                      width: "50%",
                    }}
                  ></img>
                  <Typography
                    sx={{
                      width: "100%",
                      textAlign: "center",
                      margin: "0 auto",
                      fontFamily: "Montserrat",
                    }}
                  >
                    <b
                      style={{
                        fontSize: "20px",
                      }}
                    >
                      {" "}
                      Introducing SAPP — Sentiment Adaptive Pre-Processor.
                    </b>{" "}
                    <br />
                    SAPP is an custom in-house techology built from the
                    ingenuity of our developers at Ventura UX. Imagine a chatbot
                    that doesn't just respond but actually 'feels' the vibe of
                    the conversation. <br />
                    <br />
                    <span
                      style={{
                        color: "#496D96",
                      }}
                    >
                      {" "}
                      <b>
                        {" "}
                        Using advanced natural language technology, SAPP tunes
                        into the emotion behind your words and adapts
                        accordingly. It's like giving 'thoughts' to the chatbot,
                        real time, based on the users input; we've created this
                        massive database of "thoughts" with the help of a
                        consulting psychologist.
                      </b>
                    </span>{" "}
                  </Typography>
                </Grid>
              </Box>
            </Grid>
            <Grid item xs={11} sm={5} md={4} lg={3}>
              <Box
                sx={{
                  padding: "1rem",
                  textAlign: "center",
                  boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
                  borderRadius: "8px",
                }}
              >
                {" "}
                <img
                  src={Over80}
                  style={{
                    width: "100%",
                  }}
                ></img>
              </Box>
            </Grid>
          </Grid>
          <Divider style={{ margin: "3rem 0" }} />
          <img
            style={{
              width: isMobile ? "90%" : "25%",
            }}
            src={Pricing}
          ></img>
          <Typography
            variant="body1"
            component="p"
            style={{
              marginTop: "1rem",
              fontSize: "40px",
              width: isMobile ? "90%" : "45%",
              textAlign: "center",
              margin: "0 auto",
              marginBottom: "2rem",
              fontFamily: "League Spartan",
              border: "1px silver solid",
              padding: "1rem",
              borderRadius: "20px",
            }}
          >
            $7 a month + monthly usage
            <br />
            6¢ / 1000 tokens 🪙
          </Typography>
          <Typography
            variant="body1"
            component="p"
            style={{
              marginTop: "1rem",
              fontSize: "20px",
              width: isMobile ? "90%" : "45%",
              textAlign: "center",
              margin: "0 auto",
              marginBottom: "2rem",
              fontFamily: "League Spartan",
            }}
          >
            For just 6 cents per thousand tokens, you can enjoy a comprehensive
            session with JungGPT. An average 60 chat long session might only set
            you back about $1.50, so you can chat away without breaking the
            bank!
          </Typography>
          <Typography
            variant="body2"
            component="p"
            style={{ marginTop: "1rem", color: "grey", marginBottom: "1rem" }}
          >
            Token to Dollar Converter
          </Typography>
          <TextField
            label="Amount in Dollars"
            variant="outlined"
            type="number"
            onChange={handleChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
            }}
          />
          <Typography
            variant="body1"
            component="p"
            style={{ marginTop: "1rem", fontFamily: "montserrat" }}
          >
            With{" "}
            <b
              style={{
                fontSize: "25px",
              }}
            >
              ${amount}
            </b>
            , you can have approximately{" "}
            <b
              style={{
                fontSize: "25px",
              }}
            >
              {sessions}
            </b>
            <br />
            <b
              style={{
                fontSize: "20px",
              }}
            >
              20-message sessions.
            </b>
          </Typography>
        </Box>
        {products.map((product) => (
          <Card
            sx={{
              border: "2px #CB9800 solid",
              width: isMobile ? "95%" : "420px",
              marginBottom: 2,
              textAlign: "center",
              backgroundColor: "#F8F8F8",
              borderRadius: 20,
            }}
          >
            <CardContent>
              <Typography variant="h5" component="div"></Typography>

              <img
                style={{
                  width: "80%",
                }}
                src={GoldLogo}
              ></img>
              <Divider></Divider>
              <ul style={{ marginTop: "1rem", marginRight: "1.5rem" }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontFamily: "montserrat",
                  }}
                >
                  Access to JungGPT & JungSMART
                </Typography>
                <Typography
                  variant="h6"
                  style={{ marginTop: "1rem" }}
                  sx={{
                    fontFamily: "montserrat",
                  }}
                >
                  {product.description} for all available models
                </Typography>
                <Typography
                  variant="h6"
                  style={{ marginTop: "1rem" }}
                  sx={{
                    fontFamily: "montserrat",
                  }}
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
                  backgroundColor: "#5C76ED",
                  color: "#FFF",
                  "&:hover": { backgroundColor: "#FFBE30" },
                  marginBottom: "1rem",
                  fontSize: "20px",
                  borderRadius: "30px",
                  width: "50%",
                  fontFamily: "League Spartan",
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
            <Typography
              sx={{
                margin: "0 auto",
                width: "80%",
                textAlign: "center",
                padding: "1rem",
                fontSize: "10px",
              }}
            >
              By clicking upgrade, you acknowledge you will be billed a monthly
              fee of $7, as well as be billed for monthly usage at USD $.06 /
              1000 tokens at the end of each pay period.
            </Typography>
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
