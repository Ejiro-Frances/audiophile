"use client";

import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/stores/cartStore";

const CartDisplay = () => {
  const { cart, removeFromCart, clearCart, updateQuantity } = useCartStore();

  // Calculate total
  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <section className="fixed top-[91px] left-0 z-50 bg-black/60 w-full h-full">
      <div className="absolute top-5 md:right-10 w-[327px] md:w-[377px] bg-white rounded-xl min-h-80 p-[31px]">
        {cart.length === 0 ? (
          <>
            <div className="flex justify-between items-center">
              <h6 className="text-lg text-black font-bold uppercase tracking-[1.29px]">
                CART
              </h6>
            </div>
            <p className="text-[15px] leading-[25px] text-black/50 text-center pt-20">
              Cart is empty
            </p>
          </>
        ) : (
          <>
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
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
            <ul className="space-y-6">
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
            <div className="flex justify-between items-center mt-6">
              <p className="uppercase text-black/50 text-[15px] leading-[25px]">
                Total
              </p>
              <span className="font-bold text-lg text-black">
                $ {total.toLocaleString()}
              </span>
            </div>

            {/* Checkout */}
            <Link
              href="/checkout"
              className="flex justify-center items-center bg-primary uppercase text-white w-full h-12 mt-6 hover:bg-[#FBAF85] transition"
            >
              Checkout
            </Link>
          </>
        )}
      </div>
    </section>
  );
};

export default CartDisplay;
