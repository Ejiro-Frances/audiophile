"use client";

import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/stores/cartStore";

const CartDisplay = () => {
  const { cart, removeFromCart, clearCart, updateQuantity } = useCartStore();

  // Calculate total
  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <section
      className="fixed top-0 left-0 z-60 bg-black/60 w-full h-screen"
      onClick={(e) => {
        // Close only if the user clicked on the overlay itself, not inside the white box
        if (e.target === e.currentTarget) {
          const event = new CustomEvent("closeCart");
          window.dispatchEvent(event);
        }
      }}
    >
      <div className="absolute top-[110px] inset-x-0 md:inset-x-auto md:right-10 w-[90%] md:w-[377px] bg-white rounded-xl min-h-80 py-[31px] pl-[31px] mx-auto md:mx-0 max-h-[80vh] transform transition-all duration-300 ease-out translate-x-5 opacity-0 animate-cartEnter">
        {cart.length === 0 ? (
          <>
            <div className="flex justify-between items-center pr-[31px]">
              <h6 className="text-lg text-black font-bold uppercase tracking-[1.29px]">
                CART <span>({cart.length})</span>
              </h6>
            </div>
            <p className="text-[15px] leading-[25px] text-black/50 text-center pt-20 pr-[31px]">
              Cart is empty
            </p>
          </>
        ) : (
          <>
            {/* Header */}
            <div className="flex justify-between items-center mb-6 pr-[31px]">
              <h6 className="text-lg text-black font-bold uppercase tracking-[1.29px]">
                CART <span>({cart.length})</span>
              </h6>
              <button
                onClick={clearCart}
                className="text-[15px] leading-[25px] text-black/50 underline cursor-pointer"
              >
                Remove all
              </button>
            </div>

            {/* Cart Items */}
            <ul className="space-y-6 overflow-y-auto max-h-[280px] pr-2.5">
              {cart.map((item) => (
                <li
                  key={item.id}
                  className="grid grid-cols-[auto_1fr_auto] gap-4 items-center"
                >
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={64}
                    height={64}
                    className="rounded-md"
                  />

                  <div>
                    <p className="font-bold text-[15px] leading-[25px] text-black">
                      {item.name}
                    </p>
                    <p className="text-sm text-black/50">
                      $ {item.price.toLocaleString()}
                    </p>
                  </div>

                  <div className="flex justify-around items-center bg-[#F1F1F1] w-24 py-2 rounded">
                    <button
                      onClick={() => {
                        if (item.quantity === 1) {
                          removeFromCart(item.id);
                        } else {
                          updateQuantity(
                            item.id,
                            Math.max(item.quantity - 1, 1)
                          );
                        }
                      }}
                      aria-label="Decrease quantity"
                      className="text-black/25 hover:text-primary text-lg"
                    >
                      -
                    </button>
                    <span className="font-bold test-[13px] tracking-[1px] text-black">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      aria-label="Increase quantity"
                      className="text-black/25 hover:text-primary text-lg"
                    >
                      +
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            {/* Total */}
            <div className="flex justify-between items-center mt-6 pr-[31px]">
              <p className="uppercase text-black/50 text-[15px] leading-[25px]">
                Total
              </p>
              <span className="font-bold text-lg text-black">
                $ {total.toLocaleString()}
              </span>
            </div>

            {/* Checkout */}
            <div className="mt-6 mr-[31px]">
              <Link
                href="/checkout"
                className="flex justify-center items-center bg-primary uppercase text-white w-full h-12  hover:bg-[#FBAF85] transition cursor-pointer"
              >
                Checkout
              </Link>{" "}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default CartDisplay;
