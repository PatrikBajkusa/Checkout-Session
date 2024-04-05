const fetchCustomers = require("../../utils/fetchCustomers");
const fs = require("fs").promises;
const bcrypt = require("bcrypt");

const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);

const register = async (req, res) => {
  const { name, email, password } = req.body;

  const customers = await fetchCustomers();

  const customerAlreadyExists = customers.find(
    (customer) => customer.email === email
  );

  if (customerAlreadyExists) {
    return res.status(400).json("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newCustomer = {
    name,
    email,
    password: hashedPassword,
  };
  const customer = await stripe.customers.create({
    name: name,
    email: email,
  });
  customers.push(newCustomer);
  await fs.writeFile(
    "./data/customer.json",
    JSON.stringify(customers, null, 2)
  );

  res.status(201).json(newCustomer);
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const customers = await fetchCustomers();
  const customerExists = customers.find((customer) => customer.email === email);

  if (
    !customerExists ||
    !(await bcrypt.compare(password, customerExists.password))
  ) {
    return res.status(400).json("Wrong email or password");
  }
  req.session.customer = customerExists;

  res.status(200).json(customerExists.email);
};
module.exports = { register, login };
