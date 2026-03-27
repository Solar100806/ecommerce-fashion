import { createContext, useEffect, useState, type ReactNode } from "react";
import type IProduct from "../../../interfaces/IProduct";

interface WishlistContextType {
  wishlistItems: IProduct[];
  isInWishlist: (productId: number) => boolean;
  toggleWishlist: (product: IProduct) => void;
  removeFromWishlist: (productId: number) => void;
  clearWishlist: () => void;
}

// eslint-disable-next-line react-refresh/only-export-components
export const WishlistContext = createContext<WishlistContextType | undefined>(
  undefined,
);

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const [wishlistItems, setWishlistItems] = useState<IProduct[]>(() => {
    const stored = localStorage.getItem("wishlistItems");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem("wishlistItems", JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  const isInWishlist = (productId: number) =>
    wishlistItems.some((item) => item.id === productId);

  const toggleWishlist = (product: IProduct) => {
    setWishlistItems((prev) => {
      const existed = prev.some((item) => item.id === product.id);
      if (existed) {
        return prev.filter((item) => item.id !== product.id);
      }
      return [...prev, product];
    });
  };

  const removeFromWishlist = (productId: number) => {
    setWishlistItems((prev) => prev.filter((item) => item.id !== productId));
  };

  const clearWishlist = () => setWishlistItems([]);

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        isInWishlist,
        toggleWishlist,
        removeFromWishlist,
        clearWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};
