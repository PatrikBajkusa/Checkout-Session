import { Container } from "react-bootstrap";
import { ProductsList } from "../components/ProductsList";
import { CartProvider } from "../context/CartContext";
import { Login } from "../components/Login";

export const HomePage = () => {
  return (
    <CartProvider>
      <Container>
        <Login />
        <ProductsList />
      </Container>
    </CartProvider>
  );
};
