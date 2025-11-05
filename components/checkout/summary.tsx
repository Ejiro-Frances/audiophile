import Image from "next/image";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface SummaryProps {
  cart: CartItem[];
}

const Summary = ({ cart }: SummaryProps) => {
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

      <ul className="space-y-6">
        {cart.map((item) => (
          <li key={item.id} className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <Image
                src={item.image}
                width={64}
                height={64}
                alt={item.name}
                className="rounded-md"
              />
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

      {/* Submit button inside the form parent */}
      <button
        type="submit"
        className="w-full h-12 bg-primary text-white text-[13px] leading-none tracking-[1px] uppercase font-bold hover:bg-[#FBAF85] transition mt-4"
      >
        Continue & Pay
      </button>
    </aside>
  );
};

export default Summary;
