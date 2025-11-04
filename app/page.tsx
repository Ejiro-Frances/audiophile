import Header from "@/components/shared/header";
import Hero from "@/components/homepage/hero";
import Footer from "@/components/shared/footer";
import ProductCategories from "@/components/shared/productcategories";
import Categories from "@/components/homepage/categories";

const LandingPage = () => {
  return (
    <>
      <Header />
      <Hero />

      <div className="mt-[120px] lg:mt-[120px] mx-6 lg:mx-auto mb-[168px]">
        <ProductCategories />
      </div>

      <Categories />
      <Footer />
    </>
  );
};

export default LandingPage;
