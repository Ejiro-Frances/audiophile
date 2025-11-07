import Image from "next/image";
import { CartItem } from "../../stores/cartStore";

interface SummaryProps {
  cart: CartItem[];
  isLoading: boolean;
}

export default function Summary({ cart, isLoading }: SummaryProps) {
  const shippingCost = 10;
  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const vat = subtotal * 0.075;
  const grandTotal = subtotal + shippingCost + vat;

  return (
    <aside className="bg-white p-6 lg:py-8 lg:px-[33px] rounded-xl shadow-md space-y-6 h-fit">
      <h6 className="text-lg font-bold uppercase tracking-[1px] lg:tracking-[1.29px] mb-4 lg:mb-[31px]">
        Summary
      </h6>

      {/* Items */}
      <ul className="space-y-6">
        {cart.map((item) => (
          <li key={item.id} className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="relative">
                <Image
                  src={item.image}
                  width={64}
                  height={64}
                  alt={item.name}
                  className="rounded-md"
                />
              </div>
              <div>
                <p className="font-bold text-[15px] leading-[25px] text-black">
                  {item.name}
                </p>
                <p className="text-sm leading-[25px] text-black/50">
                  $ {item.price.toLocaleString()}
                </p>
              </div>
            </div>
            <p className="font-bold text-[15px] leading-[25px] text-black/50">
              x{item.quantity}
            </p>
          </li>
        ))}
      </ul>

      {/* Totals */}
      <div className="mt-8 space-y-2">
        <div className="flex justify-between">
          <span className="text-black/50 uppercase text-[15px] leading-[25px] ">
            Total
          </span>
          <span className="font-bold text-lg leading-none ">
            ${subtotal.toLocaleString()}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-black/50 uppercase text-[15px] leading-[25px] ">
            Shipping
          </span>
          <span className="font-bold text-lg leading-none ">
            ${shippingCost.toLocaleString()}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-black/50 uppercase text-[15px] leading-[25px] ">
            VAT (Included)
          </span>
          <span className="font-bold text-lg leading-none ">
            ${vat.toLocaleString()}
          </span>
        </div>
        <div className="flex justify-between mt-4">
          <span className="text-black/50 uppercase text-[15px] leading-[25px] ">
            Grand Total
          </span>
          <span className="font-bold text-lg leading-none text-primary">
            $ {grandTotal.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Submit button */}
      <button
        type="submit"
        disabled={isLoading}
        className={`mt-6 w-full h-12 flex items-center justify-center gap-3 bg-primary text-white uppercase font-bold rounded-md transition 
          ${isLoading ? "opacity-70 cursor-not-allowed" : "hover:bg-[#FBAF85]"}`}
      >
        {isLoading ? (
          <>
            <svg
              className="w-5 h-5 animate-spin"
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
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              />
            </svg>
            Processing...
          </>
        ) : (
          "Continue & Pay"
        )}
      </button>
    </aside>
  );
}
