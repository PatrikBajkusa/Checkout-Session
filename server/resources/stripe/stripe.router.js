const express = require("express");
const { StripeSession,  Products } = require("./stripe.controller");
const { authorize } = require("../auth/auth.controller");
const bodyParser = require("body-parser");

const router = express.Router();

router.post("/create-checkout-session", StripeSession);
router.get("/products", Products);


module.exports = router;
