import { useState } from "react";
import { motion } from "framer-motion";

export default function ReviewCreater() {
  const [review, setReview] = useState({
    name: "",
    subject: "",
    reviewText: "",
    price: 0,
    value: 0,
    quality: 0,
  });

  const handleChange = (field, value) => {
    setReview((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    if (review.name && review.subject && review.reviewText) {
      console.log("Review Submitted", review);
      setReview({ name: "", subject: "", reviewText: "", price: 0, value: 0, quality: 0 });
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="p-4 bg-white rounded shadow-md w-full max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4">Write a Review</h2>
      <input type="text" placeholder="Your Name" value={review.name} onChange={(e) => handleChange("name", e.target.value)} className="border p-2 w-full mb-2 rounded" />
      <input type="text" placeholder="Subject" value={review.subject} onChange={(e) => handleChange("subject", e.target.value)} className="border p-2 w-full mb-2 rounded" />
      <textarea placeholder="Your Review" value={review.reviewText} onChange={(e) => handleChange("reviewText", e.target.value)} className="border p-2 w-full mb-2 rounded" />
      
      <div className="mb-4">
        {["price", "value", "quality"].map((field) => (
          <div key={field} className="flex items-center gap-2 mb-2">
            <span className="capitalize">{field}:</span>
            {[1, 2, 3, 4, 5].map((star) => (
              <motion.span whileHover={{ scale: 1.2 }} key={star} className={`cursor-pointer ${review[field] >= star ? "text-yellow-500" : "text-gray-300"}`} onClick={() => handleChange(field, star)}>
                ★
              </motion.span>
            ))}
          </div>
        ))}
      </div>
      
      <motion.button whileTap={{ scale: 0.9 }} onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-2 rounded w-full">
        Submit Review
      </motion.button>
    </motion.div>
  );
}
