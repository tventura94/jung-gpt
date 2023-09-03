const stripe = require("stripe")(functions.config().stripe.secret);
const STRIPE_PUBLISHABLE_KEY =
  pk_live_51NUhAbGx3uwFHp11NKw9d1EJoIWwqBlGIOdxVSjLnfIXeJVCca4rrldT7vflJDABvCvg6ILwJM28t0M2vVuW4dWA00IIv6y786;

exports.createCheckoutSession = onRequest(async (request, response) => {
  try {
    const meteredPriceId = "your_metered_price_id_here";
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price: meteredPriceId,
        },
      ],
      mode: "subscription",
      success_url: window.location.href,
      cancel_url: window.location.href,
    });
    return response.json({ sessionId: session.id });
  } catch (error) {
    console.error("Stripe session creation failed: ", error);
    return response
      .status(500)
      .json({ error: "Failed to create Stripe session." });
  }
});
