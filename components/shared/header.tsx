"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { navLinks } from "@/constants/navlinks";
import ProductCategories from "./productcategories";
import CartDisplay from "./cartdisplay";
import { useCartStore } from "@/stores/cartStore";

const Header = () => {
  const pathname = usePathname();
  const { cart } = useCartStore();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isCartOpen, setisCartOpen] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen) {
      // Prevent background scroll
      document.body.style.overflow = "hidden";
    } else {
      // Restore scrolling
      document.body.style.overflow = "";
    }

    // Cleanup in case component unmounts while open
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleCart = () => setisCartOpen(!isCartOpen);

  return (
    <header
      data-testid="test-header"
      aria-label="Main site Header"
      className="fixed top-0 left-0 w-full h-[89px] lg:h-24 z-50 bg-[#0e0e0e] text-background pt-8 px-6"
    >
      <div className="flex items-center justify-between max-w-[1110px] mx-auto border-b border-white/20 pb-9">
        {/* Mobile Menu Button */}
        <button
          data-testid="test-mobile-menu-button"
          onClick={toggleMenu}
          className="relative lg:hidden focus:outline-none"
          aria-label="Toggle navigation"
        >
          <Image
            src="/assets/hamburger.svg"
            alt="menu"
            width={16}
            height={15}
          />
        </button>

        {/* Logo */}
        <Link
          href="/"
          className="relative text-lg font-bold uppercase tracking-widest"
          onClick={() => setIsOpen(false)}
        >
          <Image
            src="/logo.svg"
            alt="Audiophile logo"
            width={143}
            height={40}
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:block">
          <ul
            data-testid="nav-links"
            className="flex items-center gap-8 uppercase font-bold text-[13px] leading-[25px] tracking-[2px]"
          >
            {navLinks.map(({ name, href }) => {
              const isActive =
                href === "/" ? pathname === href : pathname.startsWith(href);

              return (
                <li key={name} data-testid={`nav-link-${name}`}>
                  <Link
                    href={href}
                    className={`transition-colors ${
                      isActive ? "text-primary" : "text-white"
                    } hover:text-primary`}
                  >
                    {name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Cart Icon */}
        <div className="relative">
          <Image
            src="/icons/cart.svg"
            alt="cart icon"
            width={20}
            height={20}
            onClick={toggleCart}
            className="cursor-pointer"
          />
          {cart.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-primary text-white text-[10px] font-bold leading-xs w-4 h-4 rounded-full flex items-center justify-center">
              {/* {cart.reduce((total, item) => total + item.quantity, 0)} */}
              {cart.length}
            </span>
          )}
        </div>
      </div>

      {isOpen && (
        <>
          {/* Overlay behind the menu */}
          <div
            className="fixed top-[91px] left-0 w-full h-full bg-black/40 z-40 lg:hidden"
            onClick={() => setIsOpen(false)}
          />

          {/* Slide-down white menu */}
          <nav
            data-testid="mobile-menu-dropdown"
            className={`fixed top-[91px] left-0 w-full bg-white text-black z-50 px-6 py-8 shadow-lg transform transition-transform duration-300 ease-in-out lg:hidden ${
              isOpen ? "translate-y-0" : "-translate-y-full"
            }`}
          >
            <div>
              <ProductCategories />
            </div>
          </nav>
        </>
      )}

      {/* display cart */}
      {isCartOpen && <CartDisplay />}
    </header>
  );
};

export default Header;
