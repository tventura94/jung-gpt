// const express = require("express");
// const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
// const { db } = require("./firebase"); // Initialize your Firebase

// const router = express.Router();

// router.post("/create-checkout-session", async (req, res) => {
//   console.log("Received POST to /create-checkout-session"); // Log when a POST request is received

//   try {
//     const { userId } = req.body;
//     console.log(`User ID from request body: ${userId}`); // Log user ID

//     const userRef = db.collection("users").doc(userId);

//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ["card"],
//       line_items: [
//         {
//           price: "price_1NdN86Gx3uwFHp11LgNZsS1d",
//           quantity: 1,
//         },
//       ],
//       success_url: "https://jung-gpt.com/success",
//       cancel_url: "https://jung-gpt.com/cancel",
//     });

//     console.log(`Stripe session created with ID: ${session.id}`); // Log session ID

//     await userRef.set(
//       {
//         sessionId: session.id,
//       },
//       { merge: true }
//     );

//     console.log("Session ID saved to Firebase"); // Log that session ID has been saved to Firebase

//     res.json({ sessionId: session.id, url: session.url });
//   } catch (error) {
//     console.error("An error occurred:", error); // Log the full error
//     res.status(500).json({ error: error.message });
//   }
// });

// module.exports = router;
