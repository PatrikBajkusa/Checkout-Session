import { Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { ShoppingCart } from "./pages/ShoppingCart";
import { ConfirmedPayment } from "./pages/ConfirmedPayment";
import { Container } from "react-bootstrap";
import { Navbar } from "./components/Navbar";
import { About } from "./pages/About";
import { Areas } from "./pages/Areas";

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
           <Route path="/about" element={<About />}></Route>
           <Route path="/Areas" element={<Areas />}></Route>
        </Routes>
      </Container>
    </>
  );
};
