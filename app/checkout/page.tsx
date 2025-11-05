"use client";

import { useState } from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCartStore } from "@/stores/cartStore";
import BackButton from "@/components/shared/backbutton";
import Header from "@/components/shared/header";
import Footer from "@/components/shared/footer";
import Summary from "@/components/checkout/summary";
import { checkoutSchema, type CheckoutForm } from "@/schemas/checkoutschema";
import { Input } from "@/components/ui/input";

const CheckOut = () => {
  const { cart, clearCart } = useCartStore();
  const [paymentMethod, setPaymentMethod] = useState<"e-money" | "cod">(
    "e-money"
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutForm>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: { paymentMethod: "e-money" },
  });

  const onSubmit = (data: CheckoutForm) => {
    console.log({ data, cart });
    alert("Order placed successfully!");
    clearCart();
  };

  return (
    <>
      <Header />
      <main className="pt-[91px] max-w-[1110px] mx-auto px-6 md:px-0 mb-10 lg:mb-[121px]">
        <BackButton />

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 lg:grid-cols-[60fr_40fr] gap-12"
        >
          {/* Left Side */}
          <section className="bg-white rounded-xl py-[54] px-12 space-y-8 shadow-md">
            <h3 className="text-[28px] md:text-[32px] lg:leading-9 font-bold uppercase tracking-[1px] md:tracking-[1.14px]">
              Checkout
            </h3>

            {/* Billing */}
            <div className="space-y-6">
              <p className="text-primary text-[13px] leading-[25px] font-bold uppercase tracking-[0.93px]">
                Billing Details
              </p>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-4 gap-y-6">
                <div className="flex flex-col gap-[9px]">
                  <label
                    htmlFor="name"
                    className="text-xs tracking-[-0.21px] font-bold"
                  >
                    Name
                  </label>
                  <Input
                    {...register("name")}
                    id="name"
                    placeholder="Alexei Ward"
                    className=""
                  />
                  {errors.name && (
                    <p className="error">{errors.name.message}</p>
                  )}
                </div>

                <div className="flex flex-col gap-[9px]">
                  <label
                    htmlFor="email"
                    className="text-xs tracking-[-0.21px] font-bold"
                  >
                    Email Address
                  </label>
                  <Input
                    {...register("email")}
                    id="email"
                    placeholder="alexei@mail.com"
                  />
                  {errors.email && (
                    <p className="error">{errors.email.message}</p>
                  )}
                </div>

                <div className="flex flex-col gap-[9px]">
                  <label
                    htmlFor="phoneNumber"
                    className="text-xs tracking-[-0.21px] font-bold"
                  >
                    Phone Number
                  </label>
                  <Input
                    {...register("phone")}
                    id="phoneNumber"
                    placeholder="+1 202-555-0136"
                  />
                  {errors.phone && (
                    <p className="error">{errors.phone.message}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Shipping */}
            <div className="space-y-6">
              <p className="text-primary text-[13px] leading-[25px] font-bold uppercase tracking-[0.93px]">
                Shipping Info
              </p>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-4 gap-y-6">
                <div className="flex flex-col gap-[9px] lg:col-span-2">
                  <label
                    htmlFor="address"
                    className="text-xs tracking-[-0.21px] font-bold"
                  >
                    Address
                  </label>

                  <Input
                    {...register("address")}
                    id="address"
                    placeholder="1137 Williams Avenue"
                  />
                  {errors.address && (
                    <p className="error">{errors.address.message}</p>
                  )}
                </div>

                <div className="flex flex-col gap-[9px]">
                  <label
                    htmlFor="zipcode"
                    className="text-xs tracking-[-0.21px] font-bold"
                  >
                    Zip Code
                  </label>
                  <Input
                    {...register("zip")}
                    id="zipcode"
                    placeholder="ZIP Code"
                  />
                  {errors.zip && <p className="error">{errors.zip.message}</p>}
                </div>

                <div className="flex flex-col gap-[9px]">
                  <label
                    htmlFor="city"
                    className="text-xs tracking-[-0.21px] font-bold"
                  >
                    City
                  </label>
                  <Input
                    {...register("city")}
                    id="city"
                    placeholder="New York"
                  />
                  {errors.city && (
                    <p className="error">{errors.city.message}</p>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-[9px]">
                <label
                  htmlFor="country"
                  className="text-xs tracking-[-0.21px] font-bold"
                >
                  Country
                </label>
                <Input
                  {...register("country")}
                  id="country"
                  placeholder="United States"
                  className=""
                />
                {errors.country && (
                  <p className="error">{errors.country.message}</p>
                )}
              </div>
            </div>

            {/* Payment */}
            <section className="space-y-4">
              <h6 className="text-primary text-[13px] leading-[25px] font-bold uppercase tracking-[0.93px]">
                Payment Details
              </h6>

              <div className="grid grid-cols-1 lg:grid-cols-2">
                <p>Payment Method</p>

                <div className="flex flex-col gap-4">
                  <label
                    className={`flex items-center gap-3 cursor-pointer px-[18px] py-3 border rounded-xl transition-colors 
    ${paymentMethod === "e-money" ? "border-primary" : "border-[#CFCFCF]"}`}
                  >
                    <input
                      type="radio"
                      value="e-money"
                      {...register("paymentMethod")}
                      checked={paymentMethod === "e-money"}
                      onChange={() => setPaymentMethod("e-money")}
                      className="accent-primary"
                    />
                    e-Money
                  </label>

                  <label
                    className={`flex items-center gap-3 cursor-pointer px-[18px] py-3 border rounded-xl transition-colors 
    ${paymentMethod === "cod" ? "border-primary" : "border-[#CFCFCF]"}`}
                  >
                    <input
                      type="radio"
                      value="cod"
                      {...register("paymentMethod")}
                      checked={paymentMethod === "cod"}
                      onChange={() => setPaymentMethod("cod")}
                      className="accent-primary"
                    />
                    Cash on Delivery
                  </label>
                </div>
              </div>

              {paymentMethod === "e-money" && (
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div>
                    <label
                      htmlFor="eMoneyNumber"
                      className="text-xs tracking-[-0.21px] font-bold"
                    >
                      E-Money Number
                    </label>
                    <Input
                      {...register("eMoneyNumber")}
                      placeholder="238521993"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="eMoneyPin"
                      className="text-xs tracking-[-0.21px] font-bold"
                    >
                      E-Money PIN
                    </label>

                    <Input
                      {...register("eMoneyPin")}
                      placeholder="6981"
                      maxLength={4}
                    />
                  </div>
                </div>
              )}
            </section>
          </section>

          {/* Right Side */}
          <Summary cart={cart} />
        </form>
      </main>
      <Footer />
    </>
  );
};

export default CheckOut;
