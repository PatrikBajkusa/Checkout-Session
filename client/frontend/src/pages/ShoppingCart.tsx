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

  useEffect(() => {
    const storedCartItems = localStorage.getItem("cart");
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
    }
  }, []);
  const handleCheckout = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/stripe/create-checkout-session",
        {
          cartItems,
        }
      );

      if (response.status === 200) {
        const { url } = response.data;
        window.location = url;
      } else {
        console.error("Failed to initiate checkout:", response.data);
      }
    } catch (error) {
      console.error("Error initiating checkout:", error);
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
        <button className="btn btn-success" onClick={handleCheckout}>
          Checkout
        </button>
        ;
      </div>
    </>
  );
};
