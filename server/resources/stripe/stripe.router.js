const express = require("express");
const { StripeSession, webHook } = require("./stripe.controller");
const { authorize } = require("../auth/auth.controller");
const bodyParser = require("body-parser");

const router = express.Router();

router.post("/create-checkout-session", StripeSession);
router.post("/webhook", bodyParser.raw({ type: "application/json" }), webHook);

module.exports = router;
