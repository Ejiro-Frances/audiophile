"use client";

import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCartStore } from "@/stores/cartStore";
import BackButton from "@/components/shared/backbutton";
import Header from "@/components/shared/header";
import Footer from "@/components/shared/footer";
import Image from "next/image";

// --- Zod Schemas ---
const billingSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  phone: z.string().min(5, "Invalid phone number"),
});

const shippingSchema = z.object({
  address: z.string().min(1, "Address is required"),
  zip: z.string().min(1, "ZIP required"),
  city: z.string().min(1, "City required"),
  country: z.string().min(1, "Country required"),
});

const eMoneySchema = z.object({
  number: z.string().min(4, "E-Money number required"),
  pin: z.string().min(3, "E-Money PIN required"),
});

const paymentSchema = z.object({
  method: z.enum(["e-money", "cod"]),
  eMoney: eMoneySchema.optional(),
});

type BillingForm = z.infer<typeof billingSchema>;
type ShippingForm = z.infer<typeof shippingSchema>;
type PaymentForm = z.infer<typeof paymentSchema>;

const CheckOut = () => {
  const { cart, clearCart } = useCartStore();
  const [paymentMethod, setPaymentMethod] = useState<"e-money" | "cod">(
    "e-money"
  );

  // Forms
  const {
    register: registerBilling,
    handleSubmit: handleBillingSubmit,
    formState: { errors: billingErrors },
  } = useForm<BillingForm>({
    resolver: zodResolver(billingSchema),
  });

  const {
    register: registerShipping,
    handleSubmit: handleShippingSubmit,
    formState: { errors: shippingErrors },
  } = useForm<ShippingForm>({
    resolver: zodResolver(shippingSchema),
  });

  const {
    register: registerEMoney,
    handleSubmit: handleEMoneySubmit,
    formState: { errors: eMoneyErrors },
  } = useForm<PaymentForm>({
    resolver: zodResolver(paymentSchema),
  });

  // Cost Calculations
  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const shippingCost = 50; // example shipping
  const vat = subtotal * 0.075; // 7.5%
  const grandTotal = subtotal + shippingCost + vat;

  const onSubmit = (data: any) => {
    console.log({ data, cart });
    alert("Order placed successfully!");
    clearCart();
  };

  return (
    <>
      <Header />
      <main className="pt-[91px] max-w-[1110px] mx-auto px-6 md:px-0">
        <BackButton />

        <h1 className="text-[28px] md:text-[32px] font-bold uppercase tracking-[1px] md:tracking-[1.14px] mt-6 mb-10">
          Checkout
        </h1>

        <form
          onSubmit={handleBillingSubmit(onSubmit)}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12"
        >
          {/* Left Side: Forms */}
          <div className="space-y-8">
            {/* Billing */}
            <section className="bg-white p-6 rounded-xl shadow-md space-y-6">
              <h2 className="text-lg font-bold uppercase tracking-[1px]">
                Billing Details
              </h2>
              <div className="space-y-4">
                <div className="flex flex-col">
                  <label>Name</label>
                  <input
                    {...registerBilling("name")}
                    className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  {billingErrors.name && (
                    <p className="text-red-500 text-sm">
                      {billingErrors.name.message}
                    </p>
                  )}
                </div>

                <div className="flex flex-col">
                  <label>Email Address</label>
                  <input
                    {...registerBilling("email")}
                    className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  {billingErrors.email && (
                    <p className="text-red-500 text-sm">
                      {billingErrors.email.message}
                    </p>
                  )}
                </div>

                <div className="flex flex-col">
                  <label>Phone Number</label>
                  <input
                    {...registerBilling("phone")}
                    className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  {billingErrors.phone && (
                    <p className="text-red-500 text-sm">
                      {billingErrors.phone.message}
                    </p>
                  )}
                </div>
              </div>
            </section>

            {/* Shipping */}
            <section className="bg-white p-6 rounded-xl shadow-md space-y-6">
              <h2 className="text-lg font-bold uppercase tracking-[1px]">
                Shipping Info
              </h2>
              <div className="space-y-4">
                <input
                  {...registerShipping("address")}
                  placeholder="Your Address"
                  className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-primary"
                />
                {shippingErrors.address && (
                  <p className="text-red-500 text-sm">
                    {shippingErrors.address.message}
                  </p>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <input
                      {...registerShipping("zip")}
                      placeholder="ZIP Code"
                      className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    {shippingErrors.zip && (
                      <p className="text-red-500 text-sm">
                        {shippingErrors.zip.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <input
                      {...registerShipping("city")}
                      placeholder="City"
                      className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    {shippingErrors.city && (
                      <p className="text-red-500 text-sm">
                        {shippingErrors.city.message}
                      </p>
                    )}
                  </div>
                </div>

                <input
                  {...registerShipping("country")}
                  placeholder="Country"
                  className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-primary"
                />
                {shippingErrors.country && (
                  <p className="text-red-500 text-sm">
                    {shippingErrors.country.message}
                  </p>
                )}
              </div>
            </section>

            {/* Payment */}
            <section className="bg-white p-6 rounded-xl shadow-md space-y-4">
              <h2 className="text-lg font-bold uppercase tracking-[1px]">
                Payment Details
              </h2>
              <div className="flex flex-col gap-4">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === "e-money"}
                    onChange={() => setPaymentMethod("e-money")}
                    className="accent-primary"
                  />
                  E-Money
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === "cod"}
                    onChange={() => setPaymentMethod("cod")}
                    className="accent-primary"
                  />
                  Cash on Delivery
                </label>
              </div>

              {paymentMethod === "e-money" && (
                <div className="grid grid-cols-2 gap-4 mt-2">
                  <input
                    {...registerEMoney("eMoney.number")}
                    placeholder="E-Money Number"
                    className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <input
                    {...registerEMoney("eMoney.pin")}
                    placeholder="E-Money PIN"
                    className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              )}
            </section>
          </div>

          {/* Right Side: Summary */}
          <div className="bg-white p-6 rounded-xl shadow-md space-y-6">
            <h2 className="text-lg font-bold uppercase tracking-[1px] mb-4">
              Summary
            </h2>

            <ul className="space-y-4">
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
                      <p className="font-bold">{item.name}</p>
                      <p className="text-sm text-black/50">
                        ${item.price.toLocaleString()} x {item.quantity}
                      </p>
                    </div>
                  </div>
                  <p className="font-bold">
                    ${(item.price * item.quantity).toLocaleString()}
                  </p>
                </li>
              ))}
            </ul>

            <div className="border-t border-black/10 pt-4 space-y-2">
              <div className="flex justify-between">
                <span className="text-black/50 uppercase text-sm">Total</span>
                <span className="font-bold">${subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-black/50 uppercase text-sm">
                  Shipping
                </span>
                <span className="font-bold">
                  ${shippingCost.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-black/50 uppercase text-sm">
                  VAT (Included)
                </span>
                <span className="font-bold">${vat.toLocaleString()}</span>
              </div>
              <div className="flex justify-between mt-2">
                <span className="text-black/50 uppercase text-sm">
                  Grand Total
                </span>
                <span className="font-bold text-primary">
                  ${grandTotal.toLocaleString()}
                </span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full h-12 bg-primary text-white uppercase font-bold hover:bg-[#FBAF85] transition mt-4"
            >
              Continue & Pay
            </button>
          </div>
        </form>
      </main>
      <Footer />
    </>
  );
};

export default CheckOut;
