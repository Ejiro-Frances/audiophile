"use client";
import { useState } from "react";
import type { CartItem } from "@/stores/cartStore";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCartStore } from "@/stores/cartStore";
import BackButton from "@/components/shared/backbutton";
import Header from "@/components/shared/header";
import Footer from "@/components/shared/footer";
import Summary from "@/components/checkout/summary";
import { checkoutSchema, type CheckoutForm } from "@/schemas/checkoutschema";
import { Input } from "@/components/ui/input";
import OrderSuccessModal from "@/components/checkout/ordersuccessmodal";
const CheckOut = () => {
  const { cart, clearCart } = useCartStore();
  const [orderSnapshot, setOrderSnapshot] = useState<{
    name: string;
    email: string;
    order: CartItem[];
    total: number;
  } | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<"e-money" | "cod">(
    "e-money"
  );
  const [showModal, setShowModal] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutForm>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: { paymentMethod: "e-money" },
  });

  const onSubmit = async (data: CheckoutForm) => {
    setIsLoading(true);

    const orderData = {
      name: data.name,
      email: data.email,
      order: cart,
      total: cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    };

    try {
      await fetch("/api/send-confirmation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      setOrderSnapshot(orderData);
      setShowModal(true);
    } catch (error) {
      console.error("Failed to send email:", error);
    } finally {
      setIsLoading(false);
    }
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
          <section className="bg-white rounded-xl py-[54] px-[27.5px] md:px-12 space-y-8 shadow-md">
            <h3 className="text-[28px] md:text-[32px] lg:leading-9 font-bold uppercase tracking-[1px] md:tracking-[1.14px]">
              Checkout
            </h3>

            {/* Billing */}
            <div className="space-y-6">
              <p className="text-primary text-[13px] leading-[25px] font-bold uppercase tracking-[0.93px]">
                Billing Details
              </p>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-4 gap-y-6">
                <div>
                  <div className="flex justify-between mb-[9px]">
                    <label
                      htmlFor="name"
                      className={`text-xs tracking-[-0.21px] font-bold ${
                        errors.name ? "text-[#CD2C2C]" : "text-black"
                      }`}
                    >
                      Name
                    </label>
                    {errors.name && (
                      <p className="text-[#CD2C2C] text-xs tracking-[-0.21px]">
                        {errors.name.message}
                      </p>
                    )}
                  </div>
                  <Input
                    {...register("name")}
                    id="name"
                    placeholder="Alexei Ward"
                    className={
                      errors.name ? "border-[#CD2C2C]" : "border-[#CFCFCF]"
                    }
                  />
                </div>

                {/* Email */}
                <div className="flex flex-col gap-[9px]">
                  <div className="flex justify-between ">
                    <label
                      htmlFor="email"
                      className={`text-xs tracking-[-0.21px] font-bold ${
                        errors.email ? "text-[#CD2C2C]" : "text-black"
                      }`}
                    >
                      Email Address
                    </label>
                    {errors.email && (
                      <p className="text-[#CD2C2C] text-xs tracking-[-0.21px ">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                  <Input
                    {...register("email")}
                    id="email"
                    placeholder="alexei@mail.com"
                    className={
                      errors.email ? "border-[#CD2C2C]" : "border-[#CFCFCF]"
                    }
                  />
                </div>

                {/* phone number */}
                <div className="flex flex-col gap-[9px]">
                  <div className="flex justify-between ">
                    <label
                      htmlFor="phoneNumber"
                      className={`text-xs tracking-[-0.21px] font-bold ${
                        errors.phone ? "text-[#CD2C2C]" : "text-black"
                      }`}
                    >
                      Phone Number
                    </label>
                    {errors.phone && (
                      <p className="text-[#CD2C2C] text-xs tracking-[-0.21px]">
                        {errors.phone.message}
                      </p>
                    )}
                  </div>
                  <Input
                    {...register("phone")}
                    id="phoneNumber"
                    placeholder="+1 202-555-0136"
                    className={
                      errors.phone ? "border-[#CD2C2C]" : "border-[#CFCFCF]"
                    }
                  />
                </div>
              </div>
            </div>

            {/* Shipping */}
            <div className="space-y-6">
              <p className="text-primary text-[13px] leading-[25px] font-bold uppercase tracking-[0.93px]">
                Shipping Info
              </p>
              {/* shipping address */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-4 gap-y-6">
                <div className="flex flex-col gap-[9px] lg:col-span-2">
                  <div className="flex justify-between ">
                    <label
                      htmlFor="address"
                      className={`text-xs tracking-[-0.21px] font-bold ${
                        errors.address ? "text-[#CD2C2C]" : "text-black"
                      }`}
                    >
                      Address
                    </label>
                    {errors.address && (
                      <p className="text-[#CD2C2C] text-xs tracking-[-0.21px]">
                        {errors.address.message}
                      </p>
                    )}
                  </div>

                  <Input
                    {...register("address")}
                    id="address"
                    placeholder="1137 Williams Avenue"
                    className={
                      errors.address ? "border-[#CD2C2C]" : "border-[#CFCFCF]"
                    }
                  />
                </div>

                {/* zip code */}
                <div className="flex flex-col gap-[9px]">
                  <div className="flex justify-between ">
                    <label
                      htmlFor="zipcode"
                      className={`text-xs tracking-[-0.21px] font-bold ${
                        errors.zip ? "text-[#CD2C2C]" : "text-black"
                      }`}
                    >
                      Zip Code
                    </label>
                    {errors.zip && (
                      <p className="text-[#CD2C2C] text-xs tracking-[-0.21px]">
                        {errors.zip.message}
                      </p>
                    )}
                  </div>
                  <Input
                    {...register("zip")}
                    id="zipcode"
                    placeholder="ZIP Code"
                    className={
                      errors.zip ? "border-[#CD2C2C]" : "border-[#CFCFCF]"
                    }
                  />
                </div>

                {/* city */}
                <div className="flex flex-col gap-[9px]">
                  <div className="flex justify-between ">
                    <label
                      htmlFor="city"
                      className={`text-xs tracking-[-0.21px] font-bold ${
                        errors.city ? "text-[#CD2C2C]" : "text-black"
                      }`}
                    >
                      City
                    </label>

                    {errors.city && (
                      <p className="text-[#CD2C2C] text-xs tracking-[-0.21px]">
                        {errors.city.message}
                      </p>
                    )}
                  </div>
                  <Input
                    {...register("city")}
                    id="city"
                    placeholder="New York"
                    className={
                      errors.city ? "border-[#CD2C2C]" : "border-[#CFCFCF]"
                    }
                  />
                </div>
              </div>

              {/* country */}
              <div className="flex flex-col gap-[9px]">
                <div className="flex justify-between">
                  <label
                    htmlFor="country"
                    className={`text-xs tracking-[-0.21px] font-bold ${
                      errors.country ? "text-[#CD2C2C]" : "text-black"
                    }`}
                  >
                    Country
                  </label>
                  {errors.country && (
                    <p className="text-[#CD2C2C] text-xs tracking-[-0.21px]">
                      {errors.country.message}
                    </p>
                  )}
                </div>
                <Input
                  {...register("country")}
                  id="country"
                  placeholder="United States"
                  className={
                    errors.country ? "border-[#CD2C2C]" : "border-[#CFCFCF]"
                  }
                />
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
          <Summary cart={cart} isLoading={isLoading} />
        </form>

        {showModal && orderSnapshot && (
          <OrderSuccessModal
            order={orderSnapshot}
            onClose={() => {
              clearCart();
              setShowModal(false);
              setOrderSnapshot(null);
            }}
          />
        )}
      </main>
      <Footer />
    </>
  );
};

export default CheckOut;
