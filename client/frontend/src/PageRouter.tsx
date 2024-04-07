import { Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { ShoppingCart } from "./pages/ShoppingCart";
import { ConfirmedPayment } from "./pages/ConfirmedPayment";
import { Container } from "react-bootstrap";
import { Navbar } from "./components/Navbar";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";


export const PageRouter = () => {
  return (
    <>
      <Navbar />
      <Container className="mb-4">
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/shoppingcart" element={<ShoppingCart />}></Route>
          <Route
            path="/confirmedpayment"
            element={<ConfirmedPayment />}
          ></Route>

          <Route path="/login" element={<Login />}></Route>

          <Route path="/Register" element={<Register />}></Route>
          
          
        </Routes>
      </Container>
    </>
  );
};
