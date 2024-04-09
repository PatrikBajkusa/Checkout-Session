import { Outlet } from "react-router-dom";
import { Header } from "./components/Header";
import { CartProvider } from "./context/CartContext";

const Layout = () => {
  return (
    <CartProvider>
      <div>
        <Header />

        <main>
          <Outlet />
        </main>
      </div>
    </CartProvider>
  );
};

export default Layout;
