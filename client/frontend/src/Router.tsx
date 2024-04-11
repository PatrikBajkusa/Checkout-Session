import { createBrowserRouter } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import Layout from "./Layout";
import { Register } from "./pages/Register";
import { ShoppingCart } from "./pages/ShoppingCart";
import { ConfirmedPayment } from "./pages/ConfirmedPayment";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
        index: true,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/shoppingcart",
        element: <ShoppingCart />,
      },
      {
        path: "/confirmedpayment",
        element: <ConfirmedPayment />,
      },
    ],
  },
]);
