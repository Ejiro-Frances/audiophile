import Link from "next/link";

const Hero = () => {
  return (
    <section
      data-testid="test-hero-section"
      aria-label="Hero section"
      className="
        relative 
        w-full
        bg-[#0e0e0e]
        text-white
        flex flex-col
        justify-center items-center pt-[89px]"
    >
      {/* Background Images for Different Breakpoints */}
      <div
        className="
          absolute inset-0
          bg-no-repeat bg-cover bg-center
          md:bg-[url('/assets/home/tablet/image-header.jpg')]
          lg:bg-[url('/assets/home/desktop/image-hero.jpg')]
          bg-[url('/assets/home/mobile/image-header.jpg')]
        "
      />

      {/* Overlay for subtle dark effect */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Hero Content */}
      <article
        data-testid="test-hero-container"
        className="
          relative 
          z-10
          max-w-[1110px] 
          min-h-screen
          w-full
          flex 
          flex-col 
          md:flex-row 
          items-center 
          justify-center lg:justify-start 
          px-6 
          py-20
          text-center lg:text-left
        "
      >
        <section
          data-testid="test-hero-text"
          className="max-w-[398px] space-y-6"
        >
          <p
            data-testid="test-hero-new-product"
            className="text-sm tracking-[10px] text-white/50 uppercase"
          >
            New product
          </p>

          <h1
            data-testid="test-hero-title"
            className="text-[36px] md:text-[56px] leading-[58px] tracking-[2px] uppercase font-bold"
          >
            XX99 Mark II Headphones
          </h1>

          <p
            data-testid="test-hero-description"
            className="text-white/75 text-[15px] leading-[25px] font-medium md:pr-[49px]"
          >
            Experience natural, lifelike audio and exceptional build quality
            made for the passionate music enthusiast.
          </p>

          <Link
            href="/products/xx99-mark-two-headphones"
            aria-label="See product"
            data-testid="test-hero-link"
          >
            <span className="inline-flex justify-center items-center bg-primary hover:bg-[#fbaf85] w-40 h-12 font-bold text-[13px] uppercase tracking-[1px] text-white cursor-pointer transition-all duration-200 ease-in-out">
              See product
            </span>
          </Link>
        </section>
      </article>
    </section>
  );
};

export default Hero;
