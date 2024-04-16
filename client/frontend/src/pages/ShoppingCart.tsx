import axios from "axios";
import { useEffect, useState } from "react";
interface ICartItem {
  quantity: number;
  product: {
    id: string;
    images: string;
    default_price: {
      unit_amount: number;
    };
  };
}

export const ShoppingCart = () => {
  const [cartItems, setCartItems] = useState<ICartItem[]>();
  const [loginMessage, setLoginMessage] = useState(false);
  const customerId = localStorage.getItem("user");

  useEffect(() => {
    const storedCartItems = localStorage.getItem("cart");
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
    }
  }, []);

  const authorize = async () => {
    const response = await axios.get(
      "http://localhost:3000/api/auth/authorize",
      { withCredentials: true }
    );

    if (response.status === 401) {
      console.log(response.data);
      setLoginMessage(true);
    } else {
      console.log("hello");
      handleCheckout();
    }
  };

  const infoToSend = {
    customerId: customerId,
    cartItems: cartItems,
  };
  const handleCheckout = async () => {
    const response = await axios.post(
      "http://localhost:3000/api/stripe/create-checkout-session",

      infoToSend
    );

    if (response.status === 200) {
      const { url } = response.data;
      localStorage.setItem(
        "sessionId",
        JSON.stringify(response.data.sessionId)
      );
      window.location = url;
    } else {
      console.error("Failed to initiate checkout:", response.data);
    }
  };
  return (
    <>
      <h2 style={{ textAlign: "center" }}>ShoppingCart</h2>
      <ul className="d-flex align-items-center justify-content-center">
        {cartItems?.map((item, index) => (
          <div key={index} style={{ padding: "20px" }}>
            <li key={index}>Price: {item.product.default_price.unit_amount}</li>
            <img
              src={item.product.images}
              className="img-fluid img-thumbnail"
              style={{ height: "200px", width: "400px" }}
            ></img>
          </div>
        ))}
      </ul>
      <div style={{ textAlign: "center", paddingTop: "20px" }}>
        <button className="btn btn-success" onClick={authorize}>
          Checkout
        </button>

        {!loginMessage && (
          <p style={{ color: "red" }}>
            Du måste vara inloggad för att gå vidare
          </p>
        )}
      </div>
    </>
  );
};
