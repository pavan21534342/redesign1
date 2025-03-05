"use client";

import { useWishlist } from "@/app/context/WishlistContext";
import { useCart } from "../context/CartContext";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Clock, Trash } from "lucide-react";
import { IoCaretBack, IoCaretForward } from "react-icons/io5";
import { useEffect, useState } from "react";

const WishlistPage = () => {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart, updateQuantity } = useCart();
  const [loading, setLoading] = useState(false);
  const [loadingStates, setLoadingStates] = useState({});
  const [hoveredItem, setHoveredItem] = useState(null);

  const [direction, setDirection] = useState(1);
  const [isLoadingCart, setIsLoadingCart] = useState(true);

  // Track quantity for each wishlist item
  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    setTimeout(() => setIsLoadingCart(false), 1000);

    // Initialize quantities for wishlist items
    const initialQuantities = {};
    wishlist.forEach((item) => {
      initialQuantities[item.slug] = 1;
    });
    setQuantities(initialQuantities);
  }, [wishlist]);

  const handleAddToCart = async (item) => {
    setLoadingStates((prev) => ({ ...prev, [item.slug]: true }));
    const quantity = quantities[item.slug] || 1;
    await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate network delay
    addToCart({ ...item, quantity, selectedSize: item.sizes[0] });
    setLoadingStates((prev) => ({ ...prev, [item.slug]: false }));
    setQuantities((prev) => {
      return { ...prev, [item.slug]: 1 };
    });
  };

  const handleQuantityChange = (item, change) => {
    setDirection(change > 0 ? 1 : -1);

    // Update local state first
    setQuantities((prev) => {
      const newQuantity = Math.max(1, (prev[item.slug] || 1) + change);
      return { ...prev, [item.slug]: newQuantity };
    });

    // Wait for the local state to update, then update the cart quantity
    setTimeout(() => {
      updateQuantity(item.slug, item.sizes[0], quantities[item.slug] + change);
    }, 0);
  };

  return (
    <div className="container mx-auto">
      <div className="w-[90%] mx-auto">
        {/* Page Title */}
        <section className="py-10 flex justify-center">
          <h1 className="text-2xl font-bold mb-6">Your Wishlist</h1>
        </section>

        {/* Wishlist Items */}
        <div className="w-[86%] mx-auto">
          {/* Table head */}
          <div className="flex border-b pb-2">
            <div className="w-1/2">
              <h2 className="text-lg font-semibold">Product</h2>
            </div>
            <div className="w-1/4">
              <h2 className="text-lg font-semibold">Unit Price</h2>
            </div>
            <div className="w-1/6">
              <h2 className="text-lg font-semibold">Quantity</h2>
            </div>
            <div className="w-1/6">
              <h2 className="text-lg font-semibold">Total</h2>
            </div>
            <div className="w-1/3">
              <h2 className="text-lg font-semibold">Actions</h2>
            </div>
          </div>

          {/* Table Body */}
          {isLoadingCart ? (
            // Skeleton Loader
            [...Array(3)].map((_, index) => (
              <div
                key={index}
                className="animate-pulse flex items-center border-b py-4"
              >
                <div className="w-1/2 flex items-center gap-4">
                  <div className="w-20 h-20 bg-gray-300 rounded"></div>
                  <div className="flex flex-col gap-1">
                    <div className="w-24 h-4 bg-gray-300 rounded"></div>
                    <div className="w-16 h-3 bg-gray-300 rounded"></div>
                  </div>
                </div>
                <div className="w-1/4 ml-[3.5rem] mr-[1.5rem] h-4 bg-gray-300 rounded"></div>
                <div className="w-1/6 mr-4 h-4 bg-gray-300 rounded"></div>
                <div className="w-1/6 mr-4 h-4 bg-gray-300 rounded"></div>
                <div className="w-1/3 mr-4 h-4 bg-gray-300 rounded"></div>
              </div>
            ))
          ) : wishlist.length === 0 ? (
            // Empty wishlist message
            <div className="flex flex-col gap-4 items-center text-center py-10">
              <p className="text-gray-500">No products added to wishlist.</p>
              <Link href="/products">
                <button className="w-fit bg-egreen-800 hover:bg-green-700 transition text-white py-2 px-4 rounded">
                  View all products
                </button>
              </Link>
            </div>
          ) : (
            wishlist.map((item) => (
              <motion.div
                key={item.slug}
                className="flex items-center border-b py-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-1/2 flex items-center">
                  <Link
                    href={`/products/${item.slug}`}
                    className="cursor-pointer"
                  >
                    <img
                      src={item.sizes[0].images[0]}
                      alt={item.productTitle}
                      className="w-20 h-20 object-cover rounded hover:opacity-75 transition"
                    />
                  </Link>
                  <div className="flex flex-col gap-1 ml-4">
                    <Link
                      href={`/products/${item.slug}`}
                      className="hover:text-egreen-800 cursor-pointer transition"
                    >
                      <p className="font-semibold">{item.productTitle}</p>
                    </Link>
                    <p className="text-gray-500 text-xs">SKU: {item.skuCode}</p>
                    <p className="text-gray-500 text-sm">
                      Size: {item.sizes[0].size}
                    </p>
                  </div>
                </div>
                <div className="w-1/4 text-gray-700">
                  ${item.sizes[0].price.toFixed(2)}
                </div>
                <div className="w-1/6 flex items-center">
                  <div className="flex bg-gray-200 items-center justify-between gap-2 rounded-full px-3">
                    <button onClick={() => handleQuantityChange(item, -1)}>
                      -
                    </button>
                    <div className="relative w-6 h-8 overflow-hidden flex justify-center">
                      <AnimatePresence mode="popLayout">
                        <motion.span
                          key={quantities[item.slug]}
                          initial={{ opacity: 0, x: direction * 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: direction * -20 }}
                          transition={{
                            type: "tween",
                            duration: 0.3,
                            ease: "easeInOut",
                          }}
                          className="absolute top-1 text-md font-semibold"
                        >
                          {quantities[item.slug] || 1}
                        </motion.span>
                      </AnimatePresence>
                    </div>
                    <button onClick={() => handleQuantityChange(item, 1)}>
                      +
                    </button>
                  </div>
                </div>
                <div className="w-1/6 flex items-center justify-between">
                  <span className="text-gray-700">
                    $
                    {(
                      item.sizes[0].price * (quantities[item.slug] || 1)
                    ).toFixed(2)}
                  </span>
                </div>
                <div className="relative w-1/3 flex items-center justify-between gap-3">
                  <motion.button
                    onClick={() => handleAddToCart(item)}
                    disabled={loadingStates[item.slug]}
                    whileHover={{ scale: 1.009 }}
                    whileTap={{ scale: 0.99 }}
                    // className="bg-egreen-800 text-white px-8 py-2 rounded-lg hover:bg-egreen-700 transition-all flex-grow"
                    className={`text-white w-full px-4 py-2 rounded-full transition-all flex-grow ${
                      loadingStates[item.slug]
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-egreen-800 hover:bg-egreen-700"
                    }`}
                  >
                    {loadingStates[item.slug] ? (
                      <div className="flex items-center justify-center">
                        <svg
                          className="animate-spin h-5 w-5 mr-2 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8v8H4z"
                          ></path>
                        </svg>
                        Adding...
                      </div>
                    ) : (
                      "Add to Cart"
                    )}
                  </motion.button>
                  <Trash
                    onClick={() => removeFromWishlist(item.slug)}
                    className="text-egray-700 hover:text-red-500 text-2xl cursor-pointer transition-links"
                  />
                  <Clock
                    onMouseEnter={() => setHoveredItem(item.slug)}
                    onMouseLeave={() => setHoveredItem(null)}
                    className=" text-egray-700 hover:text-egreen-700 text-2xl cursor-pointer transition-links"
                  />
                  <AnimatePresence>
                    {hoveredItem === item.slug && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="absolute flex items-center justify-center gap-1 w-max bottom-11 left-28 bg-white shadow-lg rounded-md p-2 text-xs text-gray-700"
                      >
                        <Clock size={12}  className="-mt-0.5" /> Added on:{" "}
                        {new Date(item.addedDate).toLocaleString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "2-digit",
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: true,
                        })}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))
          )}

          {/* Table Footer */}
          <div className="flex border-b py-4 justify-between">
            <div className="flex items-center gap-1">
              <IoCaretBack className="text-egreen-800 text-lg" />
              <h2 className="text-base font-semibold cursor-pointer">
                Clear Wishlist
              </h2>
            </div>
            <div className="flex items-center gap-1">
              <h2 className="text-base font-semibold cursor-pointer">
                Continue Shopping
              </h2>
              <IoCaretForward className="text-egreen-800 text-lg" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WishlistPage;
