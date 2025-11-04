// "use client";

// import Link from "next/link";
// import Footer from "@/components/shared/footer";
// import Header from "@/components/shared/header";
// import Hero from "@/components/shared/hero";
// import ProductDisplay from "@/components/shared/productdisplay";
// import ProductCategories from "@/components/shared/productcategories";
// import data from "@/data/db.json";
// import type { Product } from "@/types/product";

// interface CategoryPageProps {
//   category: string;
// }

// const CategoryPage = ({ category }: CategoryPageProps) => {
//   const products = data.data.filter(
//     (product: Product) => product.category === category
//   );

//   // Handle category not found
//   if (products.length === 0) {
//     return (
//       <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
//         <h1 className="text-4xl font-bold mb-4">404 - Category Not Found</h1>
//         <p className="text-black/60 mb-8">
//           The category <span className="font-semibold">{category}</span> does
//           not exist.
//         </p>
//         <Link
//           href="/"
//           className="px-6 py-3 bg-primary text-white uppercase font-bold text-sm tracking-wider rounded-md hover:bg-[#FBAF85] transition-all"
//         >
//           Go Home
//         </Link>
//       </div>
//     );
//   }

//   return (
//     <div data-testid={`test-${category}-page`} aria-label={`${category} page`}>
//       <Header />
//       <main aria-label="Main content area">
//         <Hero heading={category.charAt(0).toUpperCase() + category.slice(1)} />

//         <article className="max-w-[1110px] mx-auto space-y-40">
//           {products.map((product, index) => (
//             <ProductDisplay
//               key={product.id}
//               productName={product.name}
//               productDescription={product.description}
//               image={product.image.desktop.replace("./", "/")}
//               isNew={product.new}
//               href={`/products/${product.slug}`}
//               imgClass={index % 2 !== 0 ? "order-1" : ""}
//               textClass={index % 2 !== 0 ? "order-2" : ""}
//             />
//           ))}
//         </article>

//         {/* mt-60 mb-[168px] */}
//         <div className="mt-[120px]">
//           <ProductCategories />
//         </div>
//       </main>
//       <Footer />
//     </div>
//   );
// };

// export default CategoryPage;
