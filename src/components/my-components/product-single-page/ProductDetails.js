import { useState } from "react";
import "react-inner-image-zoom/lib/InnerImageZoom/styles.css";
import InnerImageZoom from "react-inner-image-zoom";
import { IoMdHeartEmpty } from "react-icons/io";
import { IoMdHeart } from "react-icons/io";
import { motion, AnimatePresence } from "framer-motion";
import productsdesc from "@/product-data/productsdesc.json";
import ReviewCreater from "./ReviewCreater";
import Image from "next/image";
import { useEffect } from "react";
import { useCart } from "@/app/context/CartContext";
import { useWishlist } from "@/app/context/WishlistContext";
import { Heart } from "lucide-react";

export default function ProductDetails({ product }) {
  const { addToCart } = useCart();
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [selectedImage, setSelectedImage] = useState(selectedSize.images[0]);
  const [quantity, setQuantity] = useState(1);
  const [direction, setDirection] = useState(1);
  const [activeTab, setActiveTab] = useState("Details");
  const [loading, setLoading] = useState(false);
  
  const isWishlisted = wishlist.some((item) => item.slug === product.slug);

  useEffect(() => {
    setSelectedSize(product.sizes[0]);
  }, [product]);

  const productdescription = productsdesc.find(
    (prod) => prod.slug === product.slug
  );

  const handleAddToCart = async () => {
    setLoading(true); // Start loading
    await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate network delay
    addToCart({ ...product, quantity, selectedSize });
    setLoading(false); // Stop loading
    setQuantity(1);
  };

  const handleSizeChange = (size) => {
    setSelectedSize(size);
    setSelectedImage(size.images[0]);
    setQuantity(1);
    const newRewardPoints = Math.round(size.price);
  setRewardPoints(newRewardPoints);
  setRewardValue((newRewardPoints * 0.02).toFixed(2));
  };

  const handleQuantityChange = (change) => {
    if (quantity + change < 1) return; 
    setDirection(isNaN(change) ? 1 : change > 0 ? 1 : -1); 

    const newQuantity = Math.max(1, quantity + change);
    setQuantity(newQuantity);

    const newRewardPoints = Math.round(selectedSize.price) * newQuantity;
    setRewardPoints(newRewardPoints);
    setRewardValue((newRewardPoints * 0.02).toFixed(2));
  };



  const [rewardPoints, setRewardPoints] = useState(Math.round(selectedSize.price));
  const [rewardValue, setRewardValue] = useState((rewardPoints * 0.02).toFixed(2));
  // const rewardPoints = Math.round(selectedSize.price);
  // const rewardValue = (rewardPoints * 0.02).toFixed(2);

  const hasMultipleSizes = product.sizes.length > 1;
  const startingPrice = hasMultipleSizes ? product.sizes[0].price : null;
  const endingPrice = hasMultipleSizes
    ? product.sizes[product.sizes.length - 1].price
    : null;

  return (
    <div className="">
      {/* Page Title */}
      <section>
        <div className="bg-white mx-auto px-8 pt-16 pb-8">
          <div className="container mx-auto flex flex-col gap-2">
            <h2 className="text-3xl font-semibold text-egreen-800">
              Products: {product.productTitle}
            </h2>
            {/* breadcrumbs */}
            <div className="flex gap-2">
              <span className="text-egray-700">Home</span>
              <span className="text-egray-700">/</span>
              <span className="text-egray-700">Products</span>
              <span className="text-egray-700">/</span>
              <span className="text-egray-700">{product.productTitle}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Product Wrapper */}
      <div className="py-4 mt-8 container mx-auto flex flex-col md:flex-row gap-8 items-center">
        {/* Product Image Wrapper */}
        <div className="w-full md:max-w-[50%] flex gap-4">
          <div className="flex flex-col gap-2 mt-4 justify-center items-center">
            {selectedSize.images.map((archiveImg, idx) => (
              <img
                key={idx}
                src={archiveImg}
                alt="thumbnail"
                className={`w-20 h-16 object-cover cursor-pointer rounded-lg border transition-all ${
                  selectedImage === archiveImg
                    ? "border-green-500"
                    : "border-gray-300"
                }`}
                onClick={() => setSelectedImage(archiveImg)}
              />
            ))}
          </div>
          <div className="w-full h-[400px] md:h-[500px] relative overflow-hidden bg-white">
            <InnerImageZoom
              src={selectedImage}
              zoomSrc={selectedImage}
              zoomScale={1.1}
              zoomType="hover"
              hideHint={true}
              className="object-cover"
              
            />
          </div>
        </div>

        {/* Product Side details */}
        <div className="w-full md:min-w-[50%] flex flex-col gap-4">
          <div className="flex flex-col gap-4">
            <h1 className="text-3xl font-semibold text-egray-950">
              {product.productTitle}
            </h1>
            <p className="text-egray-700">
              If you purchase this product you will earn{" "}
              <strong>{rewardPoints}</strong> Points worth{" "}
              <strong>${rewardValue}!</strong>
            </p>

            {hasMultipleSizes && (
              <div className="flex gap-4">
                <h3 className="text-egray-900 text-xl font-semibold">
                  ${startingPrice} - ${endingPrice}
                </h3>
              </div>
            )}
            <h3 className="text-egreen-900 text-2xl font-bold">
              ${selectedSize.price}
            </h3>
            <div>
              <p className="text-egray-700 w-[70%]">{product.shortDesc}</p>
            </div>
            <div className="flex gap-4">
              {product.available ? (
                <div className="flex flex-col bg-white rounded-md max-w-fit px-4 py-1">
                  <span className="text-xs font-light">Available</span>
                  <span className="text-md text-egreen-900 font-semibold">
                    In Stock
                  </span>
                </div>
              ) : (
                <div className="flex flex-col bg-white rounded-md max-w-fit px-4 py-1">
                  <span className="text-xs font-light">Available</span>
                  <span className="text-md text-egreen-900 font-semibold">
                    Out of Stock
                  </span>
                </div>
              )}

              <div className="flex flex-col bg-white rounded-md max-w-fit px-4 py-1">
                <span className="text-xs font-light">SKU</span>
                <span className="text-md text-egreen-900 font-semibold">
                  {product.skuCode}
                </span>
              </div>
            </div>
          </div>
          {/* Size Selections */}
          <div className="flex flex-col gap-4 mt-4">
            <div className="flex flex-col gap-2">
              <p className="text-sm font-semibold block">Size</p>
              <div className="flex gap-4">
                {product.sizes.map((size, index) => (
                  <button
                    key={index}
                    className={
                      "py-2 px-4 rounded-lg border transition-all " +
                      (selectedSize.size === size.size
                        ? "border-green-500 bg-white"
                        : "border-gray-300")
                    }
                    onClick={() =>
                      selectedSize.size !== size.size && handleSizeChange(size)
                    }
                  >
                    {size.size}
                  </button>
                ))}
              </div>
            </div>
            {/* Size Selections Closed */}
            <div className="flex flex-row gap-4 items-center justify-start">
              {/* Quantity */}
              <div className="flex items-center gap-4 ">
                <button
                  className="p-2 bg-gray-200 rounded"
                  onClick={() => handleQuantityChange(-1)}
                >
                  -
                </button>
                <div className="relative w-6 h-8 overflow-hidden flex justify-center">
                  <AnimatePresence mode="popLayout" custom={direction}>
                    <motion.span
                      key={quantity}
                      // initial={{ opacity: 0, x: (direction || 1) * 20 }} // Ensure default value
                      // animate={{ opacity: 1, x: 0 }}
                      // exit={{ opacity: 0, x: (direction || 1) * -20 }} // Ensure default value
                      initial={{
                        opacity: 0,
                        x: isNaN(direction) ? 20 : direction * 20,
                      }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{
                        opacity: 0,
                        x: isNaN(direction) ? -20 : direction * -20,
                      }}
                      transition={{
                        type: "tween",
                        duration: 0.3,
                        ease: "easeInOut",
                      }}
                      className="absolute top-0.5 text-lg font-semibold"
                    >
                      {quantity}
                    </motion.span>
                  </AnimatePresence>
                </div>
                <button
                  className="p-2 bg-gray-200 rounded"
                  onClick={() => handleQuantityChange(1)}
                >
                  +
                </button>
              </div>
              {/* Add to cart */}
              <div className="w-[40%]">
                <button
                  onClick={handleAddToCart}
                  disabled={loading}
                  className={`w-full transition-all py-2 rounded-lg text-white ${
                    loading
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-egreen-600 hover:bg-egreen-700"
                  }`}
                >
                  {loading ? (
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
                </button>
              </div>
              {/* Add to Favs */}
              <motion.div
                className="p-2.5 w-fit h-fit rounded-full flex justify-center bg-gray-200 items-center cursor-pointer"
                onClick={() => {(isWishlisted ? removeFromWishlist(product.slug) : addToWishlist(product))}}
                whileTap={{ scale: 0.9 }} 
                animate={{ scale: 1.1, opacity: 1 }}
              >
                  <motion.div
                    key="filled"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1.1, opacity: 1 }}
                    whileTap={{ scale: 0.9 }} 
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 200, damping: 10 }}
                  >
                    <Heart fill={isWishlisted ? "#0a8b44" : "transparent"} size={18} className="align-middle text-egreen-700" />
                  </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* TABS */}
      <div className="container mx-auto p-4 mb-28">
        <div className="border-b flex mb-4">
          {["Details", "More Information", "Reviews"].map((tab) => (
            <button
              key={tab}
              className={`px-4 py-2 ${
                activeTab === tab ? "border-b-2 border-egreen-700" : ""
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
        {/* TAB CONTENT */}
        {activeTab === "Details" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-[80%]"
          >
            <div className="max-w-full flex flex-col gap-4 border p-4">
              {productdescription.details.map((item, index) => {
                switch (item.type) {
                  case "h2-Special":
                    return (
                      <h2
                        className="text-egreen-950 text-2xl font-semibold"
                        key={item.id || index}
                      >
                        {item.content}
                      </h2>
                    );
                  case "p":
                    return (
                      <p className="text-egray-700" key={item.id || index}>
                        {item.content}
                      </p>
                    );
                  case "list":
                    return (
                      <ul
                        key={item.id || index}
                        className="list-disc list-inside text-egray-700 space-y-2"
                      >
                        {item.content.map((list, ind) => (
                          <li className="" key={ind}>
                            {list}
                          </li>
                        ))}
                      </ul>
                    );
                  case "img":
                    return (
                      <Image
                        key={item.id || index}
                        src={item.src}
                        alt={item.alt}
                        width={560}
                        height={315}
                        className="object-cover"
                      />
                    );
                  case "iframe":
                    return (
                      <iframe
                        key={item.id || index}
                        width="560"
                        height="315"
                        src={item.src}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                      ></iframe>
                    );
                  default:
                    return null;
                }
              })}
            </div>
          </motion.div>
        )}

        {activeTab === "More Information" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-[80%]"
          >
            <div className="max-w-full flex flex-col gap-4">
              {productdescription.moreInfo.map((info, index) => (
                <div key={index} className="p-4 border">
                  {Object.entries(info).map(([key, value]) => (
                    <p key={key}>
                      <strong>{key}:</strong> {value}
                    </p>
                  ))}
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === "Reviews" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-[80%]"
          >
            <ReviewCreater producttitle={product.productTitle} />
          </motion.div>
        )}
      </div>
    </div>
  );
}
