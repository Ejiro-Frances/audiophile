import Image from "next/image";
import Link from "next/link";
import React from "react";

interface ProductDisplayProps {
  productName: string;
  productDescription: string;
  image: string;
  isNew?: boolean;
  href: string;
  imgClass?: string;
  textClass?: string;
}

const ProductDisplay: React.FC<ProductDisplayProps> = ({
  productName,
  productDescription,
  image,
  isNew = false,
  href,
  imgClass,
  textClass,
}) => {
  return (
    <article
      data-testid={`test-product-${productName
        .toLowerCase()
        .replace(/\s/g, "-")}`}
      aria-label={`Product: ${productName}`}
      className="grid grid-cols-1 lg:grid-cols-2 items-center gap-[52px] lg:gap-[125px] max-w-[90%] lg:max-w-[1110px] mx-auto py-16"
    >
      {/* Product image */}
      <div
        data-testid="test-product-image"
        className={`relative w-full lg:w-[540px] h-[560px] mx-auto lg:mx-0 rounded-xl overflow-hidden ${imgClass}`}
      >
        <Image
          src={image}
          alt={`Image of ${productName}`}
          fill
          className="object-contain"
          priority
        />
      </div>

      {/* Product text content */}
      <div
        data-testid="test-product-content"
        className={`flex flex-col justify-center items-center max-w-[445px] mx-auto lg:mx-0 space-y-6 text-center lg:text-left ${textClass}}`}
      >
        {isNew && (
          <p
            data-testid="test-product-new"
            className="text-primary text-sm uppercase tracking-[10px]"
          >
            New Product
          </p>
        )}

        <h2
          data-testid="test-product-name"
          className="text-[28px] md:text-[40px] max-w-[16ch] lg:max-w-full mx-auto lg:mx-0 font-bold uppercase tracking-[1.5px]"
        >
          {productName}
        </h2>

        <p
          data-testid="test-product-description"
          className="text-[15px] leading-[25px] text-black/50 max-w-[50ch] lg:max-w-full mx-auto"
        >
          {productDescription}
        </p>

        <Link
          href={href}
          data-testid="test-product-link"
          aria-label={`See details for ${productName}`}
          className="inline-flex items-center justify-center w-40 h-12 bg-primary hover:bg-[#FBAF85] text-white font-bold text-[13px] uppercase tracking-[1px] transition-all duration-300 ease-in-out"
        >
          See Product
        </Link>
      </div>
    </article>
  );
};

export default ProductDisplay;
