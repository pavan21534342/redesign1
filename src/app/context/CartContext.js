"use client"

import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(true);

  // Loading Cart fromt the local storage
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  // Saving Cart to the local storage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Add to cart function
  const addToCart = (item) => {
    if (!item || !item.slug) {
      console.error("Invalid item:", item);
      return;
    }
  
    setCart((prev) => {
      const existingItem = prev.find((i) => i?.slug === item.slug && i.selectedSize === item.selectedSize);
      if (existingItem) {
        return prev.map((existedItem) =>
          existedItem?.slug === item.slug
            ? { ...existedItem, quantity: (existedItem.quantity || 1) + 1 }
            : existedItem
        );
      }
  
      return [...prev, item];
    });
  
    setIsCartOpen(true);
  };
  

  // Remove from cart function
  const removeFromCart = (slug, size) => {
    setCart((prev) => prev.filter((item) => item.slug !== slug && item.selectedSize === size));
  };

  // Update quantity function
  const updateQuantity = (slug, quantity) => {
    setCart((prev) =>
      prev.map((item) => (item.slug === slug && item.selectedSize === size ? { ...item, quantity } : item))
    );
  };

  // Clear cart function
  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, isCartOpen, setIsCartOpen }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};
