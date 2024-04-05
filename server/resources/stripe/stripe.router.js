const express = require("express");
const { StripeSession } = require("./stripe.controller");

const router = express.Router();

router.post("/create-checkout-session", StripeSession);

module.exports = router;
