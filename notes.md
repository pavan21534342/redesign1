"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";

const Layout = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    setIsLoading(true); // Show preloader when navigating

    const timeout = setTimeout(() => {
      setIsLoading(false); // Hide preloader after timeout
    }, 2000);

    return () => clearTimeout(timeout); // Cleanup timeout on route changes
  }, [pathname]); // Runs when the route changes

  // Page transition animations
  const pageVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  return (
    <>
      {/* Preloader - Runs on Initial Load & Page Changes */}
      <AnimatePresence mode="wait">
        {isLoading && (
          <motion.div
            key="preloader"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="fixed inset-0 flex items-center justify-center bg-white z-50"
          >
            <Image
              src="https://www.eucaonline.com.au/media/banner/Benny-euca-loader.gif"
              alt="Loading..."
              width={200}
              height={200}
              priority
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Page Content - Fades in after preloader */}
      {!isLoading && (
        <AnimatePresence mode="wait">
          <motion.div
            key={pathname}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={pageVariants}
            transition={{ duration: 0.5 }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      )}
    </>
  );
};

export default Layout;
