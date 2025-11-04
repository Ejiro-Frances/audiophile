"use client";

import { useState } from "react";
import { useCartStore } from "@/stores/cartStore";
import type { Product } from "@/types/product";

interface AddToCartProps {
  product: Product;
}

const AddToCart = ({ product }: AddToCartProps) => {
  const { addToCart } = useCartStore();
  const [quantity, setQuantity] = useState(1);

  const increment = () => setQuantity((prev) => prev + 1);
  const decrement = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const handleAdd = () => {
    addToCart(
      {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image.mobile,
      },
      quantity
    );
  };

  return (
    <div className="flex items-center gap-4">
      {/* Quantity control */}
      <div className="flex justify-around items-center bg-[#F1F1F1] w-[120px] py-2 rounded">
        <button
          onClick={decrement}
          aria-label="Decrease quantity"
          className="text-black/50 hover:text-primary text-lg"
        >
          -
        </button>
        <span className="font-bold">{quantity}</span>
        <button
          onClick={increment}
          aria-label="Increase quantity"
          className="text-black/50 hover:text-primary text-lg"
        >
          +
        </button>
      </div>

      {/* Add to Cart */}
      <button
        onClick={handleAdd}
        className="inline-flex items-center justify-center w-40 h-12 bg-primary hover:bg-[#FBAF85] text-white font-bold text-[13px] uppercase tracking-[1px] transition-all duration-300 ease-in-out"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default AddToCart;
