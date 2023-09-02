/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */
const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
// Import necessary modules and setup
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
// Define your createCheckoutSession function
exports.createCheckoutSession = onRequest(async (request, response) => {
  try {
    // Hardcoded price ID for metered billing
    const meteredPriceId = "price_1NlwVJGx3uwFHp11F4HC6UDu";
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price: meteredPriceId,
          // No quantity specified for metered billing
        },
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "One-time fee",
            },
            unit_amount: 700, // $7.00 in cents
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: "https://jung-gpt.com",
      cancel_url: "https://jung-gpt.com",
    });
    return response.json({ sessionId: session.id });
  } catch (error) {
    console.error("Stripe session creation failed: ", error);
    return response
      .status(500)
      .json({ error: "Failed to create Stripe session." });
  }
});
// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
