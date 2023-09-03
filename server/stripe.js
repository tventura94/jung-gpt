const express = require("express");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const { db } = require("./firebase"); // Initialize your Firebase

const router = express.Router();

router.post("/create-checkout-session", async (req, res) => {
  const { userId } = req.body;

  try {
    // You can interact with Firebase here to get or save data
    // For example, let's say you want to save this sessionId to the user's document
    const userRef = db.collection("users").doc(userId);

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price: "price_1NdN86Gx3uwFHp11LgNZsS1d",
          quantity: 1,
        },
      ],
      success_url: "your-success-url",
      cancel_url: "your-cancel-url",
    });

    // Save sessionId to Firebase (optional)
    await userRef.set(
      {
        sessionId: session.id,
      },
      { merge: true }
    );

    res.json({ sessionId: session.id, url: session.url });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
