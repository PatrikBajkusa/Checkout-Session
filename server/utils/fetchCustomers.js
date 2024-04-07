const fs = require("fs").promises;

const fetchCustomers = async () => {
  const data = await fs.readFile("./data/customer.json");
  const customers = JSON.parse(data);
  return customers;
};

module.exports = fetchCustomers;
