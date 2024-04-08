import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

export interface Product {
  id: string;
  name: string;
  description: string;
  images: string;
  default_price: {
    unit_amount: number;
  };
}

interface CartItem {
  product: Product;
  quantity: number;
}

interface ICartContext {
  cart: CartItem[];
  addToCart: (product: Product) => void;
}

const initialValues = {
  cart: [],
  addToCart: () => {},
};

const CartContext = createContext<ICartContext>(initialValues);
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }: PropsWithChildren) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    const lsdata = localStorage.getItem("cart");
    return lsdata ? JSON.parse(lsdata) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Product) => {
    const cloneCart = [...cart];

    const productAlreadyExists = cloneCart.find(
      (item) => item.product.id === product.id
    );

    if (productAlreadyExists) {
      productAlreadyExists.quantity++;
      setCart(cloneCart);
    } else {
      setCart([...cart, { product, quantity: 1 }]);
    }
  };

  return (
    <CartContext.Provider value={{ cart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};
