"use client";

import { Check } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import type { CartItem } from "@/stores/cartStore";

interface OrderSuccessModalProps {
  cart: CartItem[];
  grandTotal: number;
  onClose?: () => void;
}

const OrderSuccessModal = ({
  cart,
  grandTotal,
  onClose,
}: OrderSuccessModalProps) => {
  const router = useRouter();

  const firstItem = cart[0];
  const otherCount = cart.length - 1;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-white w-[90%] max-w-md rounded-2xl p-8 shadow-xl animate-in fade-in zoom-in duration-200">
        {/* ✅ Success Icon */}
        <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mb-6">
          <Check className="text-white w-6 h-6" />
        </div>

        {/* ✅ Header */}
        <h2 className="text-[24px] md:text-[28px] font-bold uppercase leading-tight mb-2">
          Thank You <br /> For Your Order
        </h2>
        <p className="text-black/60 text-sm mb-6">
          You will receive an email confirmation shortly.
        </p>

        {/* ✅ Order Summary */}
        <div className="rounded-lg overflow-hidden flex flex-col md:flex-row">
          {/* Left: Cart Summary */}
          <div className="bg-[#F1F1F1] flex-1 p-4 space-y-4">
            {firstItem && (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Image
                    src={firstItem.image}
                    alt={firstItem.name}
                    width={50}
                    height={50}
                    className="rounded-md"
                  />
                  <div>
                    <p className="font-bold text-sm">{firstItem.name}</p>
                    <p className="text-xs text-black/50">
                      ${firstItem.price.toLocaleString()}
                    </p>
                  </div>
                </div>
                <p className="text-sm font-bold text-black/50">
                  x{firstItem.quantity}
                </p>
              </div>
            )}
            {otherCount > 0 && (
              <p className="text-xs text-black/50 text-center">
                and {otherCount} other item(s)
              </p>
            )}
          </div>

          {/* Right: Grand Total */}
          <div className="bg-black text-white flex flex-col justify-center items-start p-4 md:w-[45%]">
            <span className="text-xs uppercase text-white/60">Grand Total</span>
            <p className="text-lg font-bold">${grandTotal.toLocaleString()}</p>
          </div>
        </div>

        {/* ✅ Button */}
        <button
          onClick={() => {
            onClose?.();
            router.push("/");
          }}
          className="mt-6 w-full h-12 bg-primary text-white uppercase font-bold rounded-md hover:bg-[#FBAF85] transition"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default OrderSuccessModal;
