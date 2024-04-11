import { useEffect, useState } from "react";
import { Product, useCart } from "../context/CartContext";
import axios from "axios";

export const ProductsList = () => {
  const [products, setProducts] = useState<Product[]>();

  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await axios.get(
        "http://localhost:3000/api/stripe/products"
      );
      setProducts(response.data.data);
    };
    fetchProducts();
  }, []);

  return (
    <>
      <div className="d-flex ">
        {products?.map((product: Product) => {
          return (
            <div key={product.id} style={{ margin: "20px" }}>
              <h3>{product.name}</h3>
              <img
                src={product.images}
                className="img-fluid img-thumbnail"
                style={{ height: "200px", width: "400px" }}
              />
              <p>{product.default_price.unit_amount / 100} kr</p>
              <button onClick={() => addToCart(product)}>
                Lägg till i kundvagn
              </button>
            </div>
          );
        })}
      </div>
      <div>
        <p>
          Kungsbacka får endast handlas som ensamt <br></br> område med tanke på
          hur heligt det är.
        </p>
      </div>
    </>
  );
};
