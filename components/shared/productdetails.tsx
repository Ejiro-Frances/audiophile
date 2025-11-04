import Image from "next/image";
import Link from "next/link";
import React from "react";
import type { Product } from "@/types/product";
import AddToCart from "./addtocart";

interface ProductDetailsProps {
  product: Product;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
  return (
    <section
      data-testid={`test-product-detail-${product.slug}`}
      aria-label={`Product detail for ${product.name}`}
      className="max-w-[1110px] mx-auto"
    >
      {/* Product Image and details */}
      <article className="grid md:grid-cols-[35fr_65fr] lg:grid-cols-2 gap-16 items-center md:h-[480px] lg:h-[560px]">
        <div className="relative w-full h-full md:h-[480px] lg:h-[560px] rounded-xl overflow-hidden">
          <Image
            src={product.image.desktop}
            alt={product.name}
            fill
            className="object-contain w-full md:w-[181px] h-full"
            priority
          />
        </div>

        {/* Product Info */}
        <aside className="space-y-8">
          {product.new && (
            <p className="text-primary text-xs lg:text-sm uppercase tracking-[8.57px] lg:tracking-[10px]">
              New Product
            </p>
          )}
          <h1 className="text-[28px] lg:text-[32px] leading-8 lg:leading-10 font-bold uppercase tracking-[1px] lg:tracking-[1.5px]">
            {product.name}
          </h1>
          <p className="text-black/50 text-[15px] leading-[25px]">
            {product.description}
          </p>
          <p className="font-bold text-lg tracking-[1.29px]">
            $ {product.price.toLocaleString()}
          </p>

          <div className="grid grid-cols-2 gap-4">
            <AddToCart product={product} />
          </div>
        </aside>
      </article>

      {/* features */}
      <div className="mb-[102px]">
        <h5 className="text-2xl leading-9 tracking-[0.86px] text-black font-bold uppercase mt-[88px] mb-6">
          features
        </h5>
        <p className="text-black/50 text-[15px] leading-[25px] whitespace-pre-line">
          {product.features}
        </p>
      </div>

      {/* in the box */}
      <div className="grid grid-cols-1 md:grid-cols-2 items-center mb-[88px]">
        <h5 className="text-2xl leading-9 tracking-[0.86px] text-black font-bold uppercase mt-[88px] mb-6">
          in the box
        </h5>

        {/* list */}
        <ul className="list-style-none space-y-2">
          {product.includes.map((p, i) => (
            <li key={i * p.quantity} className="space-x-6">
              <span className="text-primary text-[15px] leading-[25px] font-bold">
                {p.quantity}x
              </span>
              <span className="text-black/50 text-[15px] leading-[25px]">
                {p.item}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* gallery */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-[120px]">
        {Object.values(product.gallery).map((imgSet, i) => (
          <picture key={i} className="relative w-full h-auto block">
            {/* Desktop */}
            <source media="(min-width: 1024px)" srcSet={imgSet.desktop} />
            {/* Tablet */}
            <source media="(min-width: 640px)" srcSet={imgSet.tablet} />
            {/* Mobile */}
            <img
              src={imgSet.mobile}
              alt={`Gallery image ${i + 1}`}
              className="rounded-lg object-cover w-full h-full"
            />
          </picture>
        ))}
      </div>

      {/* you may also like */}
      <div className="mb-[120px]">
        <h5 className="text-2xl leading-9 tracking-[0.86px] text-black font-bold uppercase mt-[88px] mb-6">
          you may also like
        </h5>

        {/* others */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {product.others.map((item, i) => (
            <div key={i} className="flex flex-col items-center">
              <picture>
                <source
                  media="(min-width:1024px)"
                  srcSet={item.image.desktop}
                />
                <source media="(min-width:640px)" srcSet={item.image.tablet} />
                <img
                  src={item.image.mobile}
                  alt={item.name}
                  className="rounded-lg mb-8 w-full object-cover"
                />
              </picture>

              <h3 className="text-xl font-bold mb-6 uppercase">{item.name}</h3>

              <Link
                href={`/products/${item.slug}`}
                className="bg-primary text-white text-sm tracking-wider px-8 py-3 uppercase hover:bg-primary/80 transition rounded-md"
              >
                See Product
              </Link>
            </div>
          ))}
        </div>
      </div>
      {/* </article> */}
    </section>
  );
};

export default ProductDetails;

// import Image from "next/image";
// import Link from "next/link";
// import React from "react";

// interface Product {
//   id: number;
//   slug: string;
//   name: string;
//   description: string;
//   features: string;
//   image: string;
//   price: number;
//   new: boolean;
// }

// interface ProductDetailsProps {
//   product: Product;
// }

// const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
//   return (
//     <section
//       data-testid={`test-product-detail-${product.slug}`}
//       aria-label={`Product detail for ${product.name}`}
//       className="max-w-[1110px] mx-auto px-4 py-24 grid md:grid-cols-2 gap-16 items-center"
//     >
//       {/* Product Image */}
//       <div className="relative w-full h-[560px] rounded-xl overflow-hidden">
//         <Image
//           src={product.image}
//           alt={product.name}
//           fill
//           className="object-cover"
//           priority
//         />
//       </div>

//       {/* Product Info */}
//       <div className="space-y-6">
//         {product.new && (
//           <p className="text-primary text-sm uppercase tracking-[10px]">
//             New Product
//           </p>
//         )}
//         <h1 className="text-[32px] md:text-[40px] font-bold uppercase tracking-[1.5px]">
//           {product.name}
//         </h1>
//         <p className="text-black/50 text-[15px] leading-[25px]">
//           {product.description}
//         </p>
//         <p className="font-bold text-lg">${product.price}</p>

//         <Link
//           href="/checkout"
//           className="inline-flex items-center justify-center w-40 h-12 bg-primary hover:bg-[#FBAF85] text-white font-bold text-[13px] uppercase tracking-[1px] transition-all duration-300 ease-in-out"
//         >
//           Add to Cart
//         </Link>
//       </div>
//     </section>
//   );
// };

// export default ProductDetails;
