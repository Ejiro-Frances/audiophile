import { notFound } from "next/navigation";

import Header from "@/components/shared/header";
import BackButton from "@/components/shared/backbutton";
import ProductDetails from "@/components/shared/productdetails";
import data from "@/data/db.json";
import type { Product } from "@/types/product";
import Footer from "@/components/shared/footer";
import ProductCategories from "@/components/shared/productcategories";

export const dynamicParams = false;

export async function generateStaticParams() {
  return data.data.map((product: Product) => ({
    slug: product.slug,
  }));
}

const ProductDetailPage = async ({ params }: { params: { slug: string } }) => {
  const { slug } = await params;

  const product = data.data.find((product: Product) => product.slug === slug);

  if (!product) return notFound();

  return (
    <>
      <Header />
      <main className="pt-24 px-6">
        <BackButton />

        <ProductDetails product={product} />
      </main>

      <div className="mt-20 md:mt-0 lg:mt-60 mb-[168px] max-w-[90%] lg:max-w-[1110px] mx-auto">
        <ProductCategories />
      </div>

      <Footer />
    </>
  );
};

export default ProductDetailPage;
