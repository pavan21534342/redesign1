import { useState } from "react";
import "react-inner-image-zoom/lib/InnerImageZoom/styles.css";
import InnerImageZoom from "react-inner-image-zoom";
import { IoMdHeartEmpty } from "react-icons/io";
import { IoMdHeart } from "react-icons/io";
import { motion, AnimatePresence } from "framer-motion";
import ProductDescriptions from "./ProductDescriptions";

// {
//   "productTitle": "FreshPaws Pet Shampoo",
//   "rewardPoints": 50,
//   "startPrice": 9.99,
//   "endPrice": 19.99,
//   "sizes": [
//     {
//       "size": "250ml",
//       "price": 9.99,
//       "images": [
//         "https://www.eucaonline.com.au/media/catalog/product/cache/56a5c0bb67c9ab146bbe435a70762341/5/4/544n5_euca_smell_expel_neutraliser_deodoriser_disinfectant_cleaner_herbal_5lt_lo_res_1.jpg",
//         "https://www.eucaonline.com.au/media/catalog/product/cache/56a5c0bb67c9ab146bbe435a70762341/1/2/12lt_smell_expell_herbal_png-min.png"
//       ]
//     },
//     {
//       "size": "500ml",
//       "price": 14.99,
//       "images": [
//         "https://www.eucaonline.com.au/media/catalog/product/cache/8bd574bd67dbb87c1ce1a1174e67353e/g/r/groupshot_shampoo_jpg.jpg",
//         "https://www.eucaonline.com.au/media/catalog/product/cache/56a5c0bb67c9ab146bbe435a70762341/7/2/728sp_forever_use_500ml_euca_trigger_spray_bottle_lo_res_1.jpg"
//       ]
//     },
//     {
//       "size": "1L",
//       "price": 19.99,
//       "images": [
//         "https://example.com/images/freshpaws_1L_1.jpg",
//         "https://example.com/images/freshpaws_1L_2.jpg"
//       ]
//     }
//   ],
//   "shortDesc": "A gentle, organic shampoo for your pets that keeps their fur soft and clean.",
//   "available": true,
//   "skuCode": "PETSHMP-001",
//   "slug": "freshpaws-pet-shampoo"
// },

export default function ProductDetails({ product }) {
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [selectedImage, setSelectedImage] = useState(selectedSize.images[0]);
  const [quantity, setQuantity] = useState(1);
  const [direction, setDirection] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);

  const handleSizeChange = (size) => {
    setSelectedSize(size);
    setSelectedImage(size.images[0]);
  };

  const handleQuantityChange = (change) => {
    if (quantity + change < 1) return; // Prevent negative numbers
    setDirection(change > 0 ? 1 : -1); // Set direction based on increment or decrement
    setQuantity((prev) => Math.max(1, prev + change));
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const rewardPoints = Math.round(selectedSize.price);
  const rewardValue = (rewardPoints * 0.02).toFixed(2);

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
      {/* Product Image Wrapper Closed*/}
      {/* Product Side details */}
      <div className="w-full md:min-w-max flex flex-col gap-4">
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
          <p className="text-egray-700 w-[70%]">
            {product.shortDesc}
          </p>
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
                    // initial={{ opacity: 0, x: direction * 20 }} // Enter from correct side
                    // animate={{ opacity: 1, x: 0 }} // Settle at center
                    // exit={{ opacity: 0, x: direction * -20 }} // Exit in opposite direction
                    initial={{ opacity: 0, x: (direction || 1) * 20 }} // Ensure default value
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: (direction || 1) * -20 }} // Ensure default value
                    transition={{
                      type: "tween",
                      duration: 0.3,
                      ease: "easeInOut",
                    }}
                    className="absolute text-lg font-semibold"
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
              <button className="w-full transition-all py-2 bg-egreen-600 hover:bg-egreen-700 text-white rounded-lg">
                Add to Cart
              </button>
            </div>
            {/* Add to Favs */}

            <motion.div
              className="p-3 w-fit h-fit rounded-full flex justify-center bg-gray-200 items-center cursor-pointer"
              onClick={toggleFavorite}
              whileTap={{ scale: 0.9 }} // Shrinks on tap for feedback
            >
              {isFavorite ? (
                <motion.div
                  key="filled"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1.1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 200, damping: 10 }}
                >
                  <IoMdHeart className="text-xl align-middle text-egreen-700 fill-egreen-700" />
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1.1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 200, damping: 10 }}
                >
                  <IoMdHeartEmpty className="text-xl align-middle text-black hover:text-egreen-800 transition-all" />
                </motion.div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
    <ProductDescriptions productdesc={product}/>
    </div>
  );
}
