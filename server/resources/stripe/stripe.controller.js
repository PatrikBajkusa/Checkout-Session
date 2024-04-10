const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);

const StripeSession = async (req, res) => {
  const { cartItems } = req.body;

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",

    line_items: cartItems.map((item) => {
      return {
        price: item.product.default_price.id,
        quantity: item.quantity,
      };
    }),
    success_url: `${process.env.CLIENT_URL}/confirmedpayment`,
    cancel_url: `${process.env.CLIENT_URL}/shoppingcart`,
  });
  res.status(200).json({ url: session.url, sessionId: session.id });
};

const Products = async (req, res) => {
  const products = await stripe.products.list({
    expand: ["data.default_price"],
  });
  res.status(200).json(products);
};

module.exports = { StripeSession, Products };
