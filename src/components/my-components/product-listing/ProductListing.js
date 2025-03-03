import { useState } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { FaHeart, FaEye } from "react-icons/fa";
import { Eye } from 'lucide-react';
import { Heart } from 'lucide-react';

import products from "@/product-data/products.json";

export default function ProductListingView() {
  const [view, setView] = useState("grid");
  const [selectedSizes, setSelectedSizes] = useState(() => {
    const initial = {};
    products.forEach((product) => {
      initial[product.skuCode] = product.sizes[0];
    });
    return initial;
  });
  const [hovered, setHovered] = useState({});

  const handleSizeChange = (sku, size) => {
    setSelectedSizes((prev) => ({ ...prev, [sku]: size }));
  };

  const toggleView = () => {
    setView((prev) => (prev === "grid" ? "list" : "grid"));
  };

  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + "...";
    }
    return text;
  };

  // Variants for staggered icon animations
  const iconContainerVariants = {
    hidden: { transition: { staggerChildren: 0.1, staggerDirection: -1 } },
    visible: { transition: { staggerChildren: 0.1 } },
  };

  const iconVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="container mx-auto p-4">
      <div className="w-[77%]">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold">Products ({products.length})</h1>
          <button
            onClick={toggleView}
            className="bg-egreen-700 text-white px-4 py-2 rounded"
          >
            Switch to {view === "grid" ? "List" : "Grid"} View
          </button>
        </div>

        <LayoutGroup>
          <motion.div
            layout
            className={`
              ${
                view === "grid"
                  ? "grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                  : "space-y-6"
              }
            `}
          >
            {products.map((product) => {
              const selectedSize = selectedSizes[product.skuCode];
              const hasMultipleImages = selectedSize.images.length > 1;
              const currentImage =
                hovered[product.skuCode] && hasMultipleImages
                  ? selectedSize.images[1]
                  : selectedSize.images[0];

              return (
                <motion.div
                  key={product.skuCode}
                  layout
                  transition={{ layout: { duration: 0.5, type: "spring" } }}
                  className={`
                    ${
                      view === "grid"
                        ? "border rounded-lg overflow-hidden flex justify-between flex-col bg-white shadow-sm"
                        : "flex flex-col sm:flex-row gap-4 p-4 border rounded-lg bg-white shadow-sm"
                    }
                  `}
                  onMouseEnter={() =>
                    setHovered((prev) => ({ ...prev, [product.skuCode]: true }))
                  }
                  onMouseLeave={() =>
                    setHovered((prev) => ({
                      ...prev,
                      [product.skuCode]: false,
                    }))
                  }
                >
                  {/* Image Container */}
                  <div
                    className={`
                      ${
                        view === "grid"
                          ? "h-64 w-full relative"
                          : "w-full sm:w-48 h-48 flex-shrink-0 relative"
                      }
                    `}
                  >
                    <AnimatePresence exitBeforeEnter>
                      <motion.img
                        key={currentImage}
                        src={currentImage}
                        alt={product.productTitle}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="w-full h-full object-contain absolute top-0 left-0"
                        style={{ maxWidth: "100%", maxHeight: "100%" }}
                      />
                    </AnimatePresence>

                    {view === "grid" && (
                      <motion.div
                        className="absolute inset-0 flex justify-center items-end gap-4"
                        initial="hidden"
                        animate={
                          hovered[product.skuCode] ? "visible" : "hidden"
                        }
                        variants={iconContainerVariants}
                      >
                        <motion.div variants={iconVariants}>
                          <FaEye className="text-white bg-black text-2xl  cursor-pointer hover:text-blue-300 transition-colors" />
                        </motion.div>
                        <motion.div variants={iconVariants}>
                          <FaHeart className="text-white bg-black text-2xl cursor-pointer hover:text-red-300 transition-colors" />
                        </motion.div>
                      </motion.div>
                    )}
                  </div>

                  {/* Content Container */}
                  <div
                    className={`
                    ${
                      view === "grid"
                        ? "p-4 flex flex-col justify-between"
                        : "flex flex-col justify-between"
                    }
                  `}
                  >
                    <h2
                      className={`
    ${view === "grid" ? "text-lg font-bold mb-2" : "text-xl font-bold"}`}
                      title={product.productTitle}
                    >
                      {view === "grid"
                        ? truncateText(product.productTitle, 50)
                        : product.productTitle}
                    </h2>

                    {view === "list" && (
                      <p className="text-gray-600">
                        {product.shortDesc}
                      </p>
                    )}

                    {view === "grid" && (
                      <div>
                        <div className="flex items-center justify-between">
                          <motion.select
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                            value={selectedSize.size}
                            onChange={(e) => {
                              const newSize = product.sizes.find(
                                (s) => s.size === e.target.value
                              );
                              handleSizeChange(product.skuCode, newSize);
                            }}
                            className="border rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
                          >
                            {product.sizes.map((sizeOption) => (
                              <option
                                key={sizeOption.size}
                                value={sizeOption.size}
                              >
                                {sizeOption.size}
                              </option>
                            ))}
                          </motion.select>
                          <span className="font-bold text-egreen-700 text-lg">
                            ${selectedSize.price.toFixed(2)}
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Add to Cart Button for Grid View */}
                    {view === "grid" && (
                      <motion.button
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.3 }}
                        className="bg-egreen-800 text-white px-4 py-2 rounded mt-4 hover:bg-egreen-700 transition-colors"
                      >
                        Add to Cart
                      </motion.button>
                    )}

{view === "list" && (
            <div className="flex flex-col gap-2 justify-between">
                            <span className="font-bold text-egreen-700 text-xl">
                            ${selectedSize.price.toFixed(2)}
                          </span>
            <div className="flex gap-4">
              {product.sizes.map((size, index) => (
                <button
                  key={index}
                  className={
                    "py-[0.1rem] px-2 rounded-lg border transition-all " +
                    (selectedSize.size === size.size
                      ? "border-egreen-700  bg-egreen-700 text-white"
                      : "border-gray-300")
                  }
                  onClick={() =>
                    selectedSize.size !== size.size && handleSizeChange(product.skuCode, size)
                  }
                >
                  {size.size}
                </button>
              ))}
            </div>

            <div className="flex flex-row items-center gap-4">
                <div className="hover:bg-egreen-900 border cursor-pointer rounded-full p-1.5 transition-links">
                <Eye size={20} className="text-egray-600 stroke-2  hover:text-white  transition-links" />
                    </div>
                <div className="hover:bg-egreen-900 border cursor-pointer rounded-full p-1.5 transition-links">
                <Heart size={20} className="text-egray-600 stroke-2  hover:text-white  transition-links" />
                    </div>

            <motion.button
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.3 }}
                        className="bg-egreen-800 text-white px-8 py-2 rounded hover:bg-egreen-700 transition-colors"
                      >
                        Add to Cart
                      </motion.button>
                </div>

          </div>
          
)}


                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </LayoutGroup>
      </div>
    </div>
  );
}
