const express = require("express");
require("dotenv").config();
const cookieSession = require("cookie-session");
const cors = require("cors");

const stripeRouter = require("./resources/stripe/stripe.router");
const customerRouter = require("./resources/customers/customer.router");
const authRouter = require("./resources/auth/auth.router");
const app = express();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(
  cookieSession({
    secret: "h3mlignyck3l",
    maxAge: 1000 * 60 * 60,
  })
);

app.use("/api/stripe", stripeRouter);
app.use("/api/customers", customerRouter);
app.use("/api/auth", authRouter);

app.listen(3000, () => console.log("Server is up n running.."));
