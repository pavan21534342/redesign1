"use client";

import { useCart } from "@/app/context/CartContext";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const router = useRouter();

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
                className="flex items-center justify-between border-b pb-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src={item.selectedSize.images[0]}
                  alt={item.productTitle}
                  className="w-20 h-20 object-cover rounded"
                />
                <div className="flex-1 ml-4">
                  <p className="font-semibold">{item.productTitle}</p>
                  <p className="text-gray-500 text-sm">
                    Size: {item.selectedSize.size}
                  </p>
                  <p className="text-gray-600">
                    ${item.selectedSize.price.toFixed(2)}
                  </p>
                  <div className="flex items-center mt-2">
                    <input
                      type="number"
                      value={item.quantity}
                      min="1"
                      onChange={(e) =>
                        updateQuantity(
                          item.slug,
                          item.selectedSize,
                          Number(e.target.value)
                        )
                      }
                      className="w-12 border rounded p-1 text-center"
                    />

                    <button
                      onClick={() =>
                        removeFromCart(item.slug, item.selectedSize.size)
                      }
                      className="ml-3 text-red-500 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Subtotal and Checkout */}
          <div className="mt-8 p-4 bg-gray-100 rounded-lg">
            <p className="text-lg font-semibold">
              Subtotal: ${cartTotal.toFixed(2)}
            </p>
            {isEligibleForFreeShipping ? (
              <p className="text-green-600 text-sm">
                🎉 Free shipping unlocked!
              </p>
            ) : (
              <p className="text-gray-600 text-sm">
                Spend ${freeShippingThreshold - cartTotal} more for free
                shipping.
              </p>
            )}
            <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded">
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}
