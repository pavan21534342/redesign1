"use client";

import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    if (typeof window !== "undefined") {
      const storedCart = localStorage.getItem("cart");
      return storedCart ? JSON.parse(storedCart) : [];
    }
    return [];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart)); // Always update local storage
  }, [cart]);

  const addToCart = (item) => {
    if (!item || !item.slug || !item.selectedSize) {
      console.error("Invalid item:", item);
      return;
    }

    setCart((prev) => {
      const existingItem = prev.find(
        (i) => i.slug === item.slug && i.selectedSize.size === item.selectedSize.size
      );

      if (existingItem) {
        return prev.map((existedItem) =>
          existedItem.slug === item.slug && existedItem.selectedSize.size === item.selectedSize.size
            ? { ...existedItem, quantity: existedItem.quantity + item.quantity }
            : existedItem
        );
      }

      return [...prev, { ...item, quantity: item.quantity || 1 }];
    });

    setIsCartOpen(true);
  };

  const removeFromCart = (slug, size) => {
    setCart((prev) => {
      const updatedCart = prev.filter((item) => !(item.slug === slug && item.selectedSize.size === size));
      localStorage.setItem("cart", JSON.stringify(updatedCart)); // Fix local storage not updating
      return updatedCart;
    });
  };

  const updateQuantity = (slug, selectedSize, quantity) => {
    setCart((prev) =>
      prev.map((item) =>
        item.slug === slug && item.selectedSize === selectedSize ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart"); // Make sure storage clears when the cart is empty
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
