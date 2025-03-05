"use client";
import { createContext, useContext, useEffect, useState } from "react";

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
    const [wishlist, setWishlist] = useState(() => {
        if (typeof window !== "undefined") {
            const storedWishlist = localStorage.getItem("wishlist");
            return storedWishlist ? JSON.parse(storedWishlist) : [];
        }
        return [];
    });

    useEffect(() => {
        if (wishlist.length === 0) {
            localStorage.removeItem("wishlist"); // Clears storage if empty
        } else {
            localStorage.setItem("wishlist", JSON.stringify(wishlist));
        }
    }, [wishlist]);

    const addToWishlist = (product) => {
        if (!product || !product.slug) {
            console.error("Invalid item:", product);
            return;
        }
        if (!wishlist.some((item) => item.slug === product.slug)) {
            const updatedWishlist = [...wishlist, { ...product, addedDate: new Date().toISOString() }];
            setWishlist(updatedWishlist);
            localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
        }
    };

    const removeFromWishlist = (slug) => {
        setWishlist((prevWishlist) => {
            const updatedWishlist = prevWishlist.filter((item) => item.slug !== slug);
            localStorage.setItem("wishlist", JSON.stringify(updatedWishlist)); // Fix storage update
            return updatedWishlist;
        });
    };

    return (
        <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist }}>
            {children}
        </WishlistContext.Provider>
    );
}

export const useWishlist = () => useContext(WishlistContext);
