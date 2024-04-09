import { Container } from "react-bootstrap";
import { ProductsList } from "../components/ProductsList";
import { Login } from "../components/Login";

export const HomePage = () => {
  return (
    <Container>
      <Login />
      <ProductsList />
    </Container>
  );
};
