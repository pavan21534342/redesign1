"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Tooltip = ({ content, children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const tooltipRef = useRef(null);
  const triggerRef = useRef(null);
  const [tooltipStyles, setTooltipStyles] = useState({ top: 0, left: 0 });

  useEffect(() => {
    if (!isVisible || !triggerRef.current || !tooltipRef.current) return;

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();

    setTooltipStyles({
      top: triggerRect.top - tooltipRect.height - 8, // 8px gap above
      left: triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2, // Centered
    });
  }, [isVisible]);

  return (
    <div
      ref={triggerRef}
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}

      <AnimatePresence>
        {isVisible && (
          <motion.div
            ref={tooltipRef}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            transition={{ duration: 0.2 }}
            className="fixed bg-gray-800 text-white text-sm px-3 py-1 rounded shadow-lg whitespace-nowrap z-50"
            style={{
              top: `${tooltipStyles.top}px`,
              left: `${tooltipStyles.left}px`,
              position: "absolute",
            }}
          >
            {content}

            {/* Arrow */}
            <div className="absolute w-0 h-0 border-4 border-transparent border-t-gray-800 left-1/2 -translate-x-1/2 top-full"></div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Tooltip;
