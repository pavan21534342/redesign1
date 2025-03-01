"use client";

import { useCart } from "@/app/context/CartContext";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const handleQuantityChange = (item, change) => {
    const newQuantity = Math.max(1, item.quantity + change);
    updateQuantity(item.slug, item.selectedSize, newQuantity);
  };

  const handleCheckout = async () => {
    setLoading(true);
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cart }),
    });
    console.log("CART:", cart);

    const data = await res.json();
    if (data.url) {
      window.location.href = data.url; // Redirect to Stripe Checkout
    } else {
      alert("Failed to initiate checkout!");
      setLoading(false);
    }
  };

  const cartTotal = cart.reduce(
    (total, item) => total + item.selectedSize.price * item.quantity,
    0
  );
  const freeShippingThreshold = 200;
  const isEligibleForFreeShipping = cartTotal >= freeShippingThreshold;

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>

      {cart.length === 0 ? (
        <div className="text-center text-gray-500">
          <p>Your cart is empty.</p>
          <button
            onClick={() => router.push("/")}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <>
          <div className="space-y-6">
            {cart.map((item) => (
              <motion.div
                key={`${item.slug}-${item.selectedSize.size}`}
                className="flex items-center justify-start border-b pb-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src={item.selectedSize.images[0]}
                  alt={item.productTitle}
                  className="w-20 h-20 object-cover rounded"
                />
                <div className="flex ml-4 items-end">
                  <div>
                    <p className="font-semibold">{item.productTitle}</p>
                    <p className="text-gray-500 text-sm">
                      Size: {item.selectedSize.size}
                    </p>
                    <p className="text-gray-600">
                      ${item.selectedSize.price.toFixed(2)}
                    </p>
                  </div>

                  <div className="flex items-center mt-2">
                    <div className="flex bg-gray-200 items-center justify-between gap-2 rounded-full px-1">
                      <button
                        className="pl-1"
                        onClick={() => handleQuantityChange(item, -1)}
                      >
                        -
                      </button>
                      <div className="relative w-6 h-8 overflow-hidden flex justify-center">
                        <AnimatePresence mode="popLayout">
                          <motion.span
                            key={item.quantity}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{
                              type: "tween",
                              duration: 0.3,
                              ease: "easeInOut",
                            }}
                            className="absolute top-1 text-md font-semibold"
                          >
                            {item.quantity}
                          </motion.span>
                        </AnimatePresence>
                      </div>
                      <button
                        className="pr-1"
                        onClick={() => handleQuantityChange(item, 1)}
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() =>
                        removeFromCart(item.slug, item.selectedSize.size)
                      }
                      className="ml-3 text-red-700 hover:text-red-500 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Subtotal and Checkout */}
          <div className="mt-8 p-4 bg-white rounded-lg">
            <p className="text-lg font-semibold">
              Subtotal: ${cartTotal.toFixed(2)}
            </p>
            {isEligibleForFreeShipping ? (
              <p className="text-green-600 text-sm">
                🎉 Free shipping unlocked!
              </p>
            ) : (
              <p className="text-gray-600 text-sm">
                Spend ${(freeShippingThreshold - cartTotal).toFixed(2)} more for
                free shipping.
              </p>
            )}
            <button
              onClick={handleCheckout}
              disabled={loading}
              className="mt-6 w-full bg-egreen-800 text-white py-2 rounded"
            >
              {loading ? "Processing..." : "Proceed to Checkout"}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
