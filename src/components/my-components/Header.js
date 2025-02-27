"use client";

import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
  NavigationMenuContent,
} from "@/components/ui/navigation-menu";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useEffect } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { RxAvatar } from "react-icons/rx";
import { IoMdHeartEmpty } from "react-icons/io";


const menuItems = [
  { title: "Home", href: "/", hasDropdown: false },
  {
    title: "Shop",
    hasDropdown: true,
    links: [
      { name: "Laundry Powder", href: "/products/freshpaws-pet-shampoo" },
      { name: "Pet Shampoo", href: "/" },
      { name: "Dish Washing Powder", href: "/" },
    ],
  },
  {
    title: "Wholesale",
    hasDropdown: true,
    links: [
      { name: "Wholesale Login", href: "/" },
      { name: "Wholesale Singup", href: "/" },
      { name: "Training", href: "/" },
    ],
  },
  {
    title: "About us",
    hasDropdown: true,
    links: [
      { name: "About us", href: "/" },
      { name: "Testmonials", href: "/" },
      { name: "Eucalyptus Oil", href: "/" },
      { name: "Our Friends", href: "/" },
      { name: "Stockists", href: "/" },
    ],
  },
  {
    title: "Media",
    hasDropdown: true,
    links: [
      { name: "Blog", href: "/" },
      { name: "Euca Video", href: "/" },
    ],
  },
  { title: "Contact", href: "/", hasDropdown: false },
];

export default function Header() {
  const [openMenu, setOpenMenu] = useState(null);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    if (!hovering) {
      const timer = setTimeout(() => setOpenMenu(null), 200); // Delay closing
      return () => clearTimeout(timer);
    }
  }, [hovering]);

  return (
    <header className="flex justify-between items-center px-8 py-4 bg-[#8ec298]">
      <div className="container flex justify-between items-center mx-auto">

   
      <div className="flex items-center flex-row align-middle w-sm space-x-2">
        <Link href={"/"}><Image
          src={"/header-assets/logo.png"}
          alt="Euca Logo"
          width={95}
          height={95}
        /></Link>
        <span className="text-white text-sm w-36">
          A better way to clean the whole home!
        </span>
        <div className="flex items-center flex-row space-x-2">
          <Image
            src={"/header-assets/euca_award_2021_cropped.png"}
            alt="Euca Logo"
            width={50}
            height={50}
          />
          <Image
            src={"/header-assets/euca_award_2024_crop.png"}
            alt="Euca Logo"
            width={50}
            height={50}
          />
          <Image
            src={"/header-assets/shippit-carbon.png"}
            alt="Euca Logo"
            width={50}
            height={50}
          />
        </div>
      </div>

      <div className="flex items-center flex-row space-x-2">
        <nav className="relative">
          <ul className="flex space-x-8">
            {menuItems.map((item, index) => (
              <li
                key={index}
                className="relative group"
                onMouseEnter={() => item.hasDropdown && setOpenMenu(index)}
                onMouseLeave={() => item.hasDropdown && setHovering(false)}
              >
                {/* Normal Menu Item (No Dropdown) */}
                {!item.hasDropdown ? (
                  <Link
                    href={item.href}
                    className="text-lg text-white font-medium hover:underline hover:text-white/90"
                  >
                    {item.title}
                  </Link>
                ) : (
                  /* Dropdown Trigger */
                  <button
                    className="text-lg text-white font-medium hover:text-white/90"
                    onMouseEnter={() => setHovering(true)}
                  >
                    {item.title}
                  </button>
                )}

                {/* Mega Menu for Dropdown Items */}
                <AnimatePresence>
                  {openMenu === index && item.hasDropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute left-0 top-full mt-2 w-64 bg-white shadow-lg rounded-lg p-4"
                      onMouseEnter={() => setHovering(true)}
                      onMouseLeave={() => setHovering(false)}
                    >
                      {item.links.map((link, linkIndex) => (
                        <Link
                          key={linkIndex}
                          href={link.href}
                          className="block px-4 py-2 text-gray-700 hover:bg-[#fefce8] rounded-md"
                        >
                          {link.name}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="flex items-center justify-end flex-row space-x-2 w-1/5">
        <IoSearchOutline className="text-white text-2xl cursor-pointer hover:text-white/70"/>
        <RxAvatar className="text-white text-2xl cursor-pointer hover:text-white/70" />
        <IoMdHeartEmpty className="text-white text-2xl cursor-pointer hover:text-white/70"/>
      </div>
      </div>
    </header>
  );
}
