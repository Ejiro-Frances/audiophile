import NotFound from "../not-found";
import Header from "@/components/shared/header";
import Footer from "@/components/shared/footer";
import ProductDisplay from "@/components/shared/productdisplay";
import ProductCategories from "@/components/shared/productcategories";
import data from "@/data/db.json";
import type { Product } from "@/types/product";

// Generate static paths for all categories
export async function generateStaticParams() {
  const categories = Array.from(
    new Set(data.data.map((product: Product) => product.category))
  );

  return categories.map((category) => ({ category }));
}

const CategoryPage = async ({ params }: { params: { category: string } }) => {
  const { category } = await params;

  const products = data.data.filter(
    (product: Product) => product.category === category
  );

  if (!products.length) return <NotFound />;

  const heading = category.charAt(0).toUpperCase() + category.slice(1);

  return (
    <div data-testid={`test-${category}-page`} aria-label={`${category} page`}>
      <Header />
      <main data-testid="test-main-content" aria-label="Main content area">
        <section
          data-testid={`test-${heading.toLowerCase()}-hero-section`}
          aria-label={`${heading} hero section`}
          className="bg-black h-[336px] pt-[105px] lg:pt-[195px] flex items-center justify-center text-center"
          role="banner"
        >
          <h1
            data-testid="test-hero-heading"
            className="text-white text-[40px] md:text-[56px] font-bold uppercase tracking-[2px]"
            aria-label={`Page heading: ${heading}`}
          >
            {heading}
          </h1>
        </section>

        <article className="max-w-[1110px] mx-auto space-y-0 lg:space-y-40">
          {products.map((product, index) => (
            <ProductDisplay
              key={product.id}
              productName={product.name}
              productDescription={product.description}
              image={product.image.desktop.replace("./", "/")}
              isNew={product.new}
              href={`/products/${product.slug}`}
              imgClass={index % 2 !== 0 ? "lg:order-1" : ""}
              textClass={index % 2 !== 0 ? "lg:order-2" : ""}
            />
          ))}
        </article>

        <div className="mt-20 md:mt-0 lg:mt-60 mb-[168px]">
          <ProductCategories />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CategoryPage;

// import NotFound from "../not-found";
// import Header from "@/components/shared/header";
// import Hero from "@/components/shared/hero";
// import Footer from "@/components/shared/footer";
// import ProductDisplay from "@/components/shared/productdisplay";
// import ProductCategories from "@/components/shared/productcategories";
// import data from "@/data/db.json";
// import type { Product } from "@/types/product";

// // Generate static paths for all categories
// export async function generateStaticParams() {
//   const categories = Array.from(
//     new Set(data.data.map((product: Product) => product.category))
//   );

//   return categories.map((category) => ({ category }));
// }

// const CategoryPage = async ({ params }: { params: { category: string } }) => {
//   const { category } = params;

//   const products = data.data.filter(
//     (product: Product) => product.category === category
//   );

//   if (!products.length) return <NotFound />;

//   return (
//     <div data-testid={`test-${category}-page`} aria-label={`${category} page`}>
//       <Header />
//       <main data-testid="test-main-content" aria-label="Main content area">
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

//         <div className="mt-60 mb-[168px]">
//           <ProductCategories />
//         </div>
//       </main>
//       <Footer />
//     </div>
//   );
// };

// export default CategoryPage;
