const fetchCustomers = require("../../utils/fetchCustomers");

const getCustomers = async (req, res) => {
  const customers = await fetchCustomers();
  if (!customers || customers.length <= 0) {
    return res.status(400).json("No users found");
  }
  res.status(200).json(customers);
};
module.exports = { getCustomers };
