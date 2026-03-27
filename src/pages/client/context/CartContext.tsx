import { createContext, useEffect, useState, type ReactNode } from "react";
import type IProduct from "../../../interfaces/IProduct";

export interface CartItem extends IProduct {
  cartQuantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: IProduct, quantity?: number) => void;
  increaseQuantity: (id: number) => void;
  decreaseQuantity: (id: number) => void;
  removeItem: (id: number) => void;
  clearCart: () => void;
}

// eslint-disable-next-line react-refresh/only-export-components
export const CartContext = createContext<CartContextType | undefined>(
  undefined,
);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem("cartItems");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const clearCart = () => setCartItems([]);

  const addToCart = (product: IProduct, quantity: number = 1) => {
    const existingItem = cartItems.find((item) => item.id === product.id);

    if (existingItem) {
      if (existingItem.cartQuantity + quantity > product.quantity) {
        alert("Số lượng sản phẩm trong giỏ hàng vượt quá giới hạn tồn kho!");
        return;
      }
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.id === product.id
            ? { ...item, cartQuantity: item.cartQuantity + quantity }
            : item,
        ),
      );
    } else {
      if (product.quantity < quantity) {
        alert("Sản phẩm không đủ số lượng trong kho!");
        return;
      }
      setCartItems((prevItems) => [
        ...prevItems,
        { ...product, cartQuantity: quantity },
      ]);
    }
    alert("Đã thêm sản phẩm vào giỏ hàng!");
  };

  const increaseQuantity = (id: number) => {
    const itemToIncrease = cartItems.find((item) => item.id === id);
    if (
      itemToIncrease &&
      itemToIncrease.cartQuantity >= itemToIncrease.quantity
    ) {
      alert("Số lượng sản phẩm vượt quá số lượng trong kho!");
      return;
    }

    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, cartQuantity: item.cartQuantity + 1 }
          : item,
      ),
    );
  };

  const decreaseQuantity = (id: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id && item.cartQuantity > 1
          ? { ...item, cartQuantity: item.cartQuantity - 1 }
          : item,
      ),
    );
  };

  const removeItem = (id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeItem,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
