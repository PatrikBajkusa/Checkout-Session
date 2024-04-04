const express = require("express");
require("dotenv").config();
const CookieSession = require("cookie-session");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);

const storeItems = new Map([
  [1, { priceInCents: 10000, name: "Lets go" }],
  [2, { priceInCents: 20000, name: "Ehyo Lets go" }],
]);

app.post("/create-checkout-session", async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: req.body.items.map((item) => {
        const storeItem = storeItems.get(item.id);
        return {
          price_data: {
            currency: "sek",
            product_data: {
              name: storeItem.name,
            },
            unit_amount: storeItem.priceInCents,
          },
          quantity: item.quantity,
        };
      }),
      success_url: `${process.env.CLIENT_URL}/confirmedpayment`,
      cancel_url: `${process.env.CLIENT_URL}/shoppingcart`,
    });
    res.json({ url: session.url });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.listen(3000, () => console.log("Server is up n running.."));
