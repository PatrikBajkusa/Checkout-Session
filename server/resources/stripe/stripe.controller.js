const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);
const fs = require("fs").promises;

const retrieveStripe = async (email) => {
  const customer = await stripe.customers.list({ email: email, limit: 1 });
  return customer.data[0].id;
};

const StripeSession = async (req, res) => {
  const cartItems = req.body.cartItems;

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    customer: JSON.parse(req.body.customerId),
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

const verify = async (req, res) => {
  const sessionId = req.body.sessionId;

  const session = await stripe.checkout.sessions.retrieve(sessionId);

  if (session.payment_status === "paid") {
    const lineItems = await stripe.checkout.sessions.listLineItems(sessionId);

    const order = {
      orderNumber: Math.floor(Math.random() * 100000),
      customerName: session.customer_details.name,
      products: lineItems.data,
      total: session.amount_total,
      date: new Date(),
    };
    const orders = JSON.parse(await fs.readFile("./data/orders.json"));
    orders.push(order);
    await fs.writeFile("./data/orders.json", JSON.stringify(orders, null, 4));
    res.status(200).json({ verified: true });
  }
};

const Products = async (req, res) => {
  const products = await stripe.products.list({
    expand: ["data.default_price"],
  });
  res.status(200).json(products);
};

module.exports = { StripeSession, Products, verify, retrieveStripe };
