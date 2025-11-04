import Image from "next/image";
import Link from "next/link";

const Categories = () => {
  return (
    <>
      {/* PRODUCTS SECTION */}
      <article
        data-testid="test-products-container"
        aria-label="Promoted products and store highlights"
        className="max-w-[90%] lg:max-w-[1110px] w-full mx-auto space-y-12 mb-[200px]"
      >
        {/* ZX9 SPEAKER */}
        <section
          data-testid="test-speaker-zx9-container"
          aria-label="ZX9 Speaker promotion"
          className="relative bg-primary flex flex-col lg:flex-row items-center justify-center lg:justify-between gap-24 lg:gap-[138px] min-h-[600px] lg:h-[560px] w-full mx-auto pl-[117.49px] pr-[95px] pb-10 rounded-xl overflow-hidden"
        >
          {/* bg pattern */}
          <div
            data-testid="test-pattern-background"
            // w-[558px] h-[558px]
            className="absolute -top-40 lg:top-0 -left-40 lg:left-0 z-0 bg-[url('/assets/home/desktop/pattern-circles.svg')] bg-cover bg-no-repeat w-[300px] lg:w-[944px] h-full lg:h-[944px]"
            role="presentation"
            aria-hidden="true"
          ></div>

          {/* speaker image */}
          <div
            data-testid="test-speaker-zx9-image-container"
            className="relative translate-y-14"
          >
            <Image
              data-testid="test-speaker-image"
              src="/assets/home/desktop/image-speaker-zx9.svg"
              alt="ZX9 Speaker"
              width={410.23}
              height={493}
              priority
            />
          </div>
          {/* <picture
            data-testid="test-speaker-image"
            className="relative translate-y-12 lg:translate-y-14"
          >
            <source
              media="(min-width: 1024px)"
              srcSet="/assets/home/desktop/image-speaker-zx9.png"
            />

            <source
              media="(min-width: 640px)"
              srcSet="/assets/home/tablet/image-speaker-zx9.png"
            />

            <Image
              src="/assets/home/mobile/image-speaker-zx9.png"
              alt="ZX9 Speaker"
              width={410.23}
              height={493}
              priority
              className="mx-auto object-contain"
            />
          </picture> */}

          {/* text */}
          <div
            data-testid="test-speaker-text"
            className="relative flex flex-col items-center lg:items-start z-40 w-[280px] lg:w-[349px] h-[303px] text-center lg:text-start"
          >
            <h3
              data-testid="test-speaker-title"
              className="text-white text-[36px] sm:text-[56px] leading-10 sm:leading-[58px] tracking-[1.29px] sm:tracking-[2px] uppercase mb-6 max-w-[10ch]"
            >
              ZX9 SPEAKER
            </h3>
            <p
              data-testid="test-speaker-description"
              className="text-white/75 text-[15px] leading-[25px] mb-10"
            >
              Upgrade to premium speakers that are phenomenally built to deliver
              truly remarkable sound.
            </p>
            <Link
              data-testid="test-speaker-zx9-link"
              href="#"
              aria-label="View ZX9 Speaker product"
              className="flex items-center justify-center w-40 h-12 bg-black hover:bg-[#4C4C4C] text-white font-bold text-[13px] uppercase tracking-[1px] cursor-pointer transition-all duration-200 ease-in-out"
            >
              See product
            </Link>
          </div>
        </section>

        {/* ZX7 SPEAKER */}
        <section
          data-testid="test-speaker-zx7-container"
          aria-label="ZX7 Speaker promotion"
          className="bg-[url('/assets/home/mobile/image-speaker-zx7.jpg')] md:bg-[url('/assets/home/tablet/image-speaker-zx7.jpg')] lg:bg-[url('/assets/home/desktop/image-speaker-zx7.jpg')] bg-no-repeat bg-cover bg-center flex items-center h-80 pl-6 lg:pl-[95px] rounded-xl oveflow-hidden"
        >
          <div
            data-testid="test-speaker-zx7-text-container"
            className="lg:w-[204px]"
          >
            <h4
              data-testid="test-speaker-zx7-title"
              className="text-[28px] leading-none font-bold uppercase tracking-[2px] mb-8"
            >
              ZX7 SPEAKER
            </h4>
            <Link
              data-testid="test-speaker-zx7-link"
              href="#"
              aria-label="View ZX7 Speaker product"
              className="flex items-center justify-center w-40 h-12 bg-transparent border border-black text-black hover:bg-black hover:text-white  font-bold text-[13px] uppercase tracking-[1px] cursor-pointer transition-all duration-200 ease-in-out"
            >
              See product
            </Link>
          </div>
        </section>

        {/* YX1 EARPHONES */}
        <section
          data-testid="test-earphones-container"
          aria-label="YX1 Earphones promotion"
          className="grid grid-cols-1 md:grid-cols-2 gap-[30px] h-[424px] lg:h-80"
        >
          <picture
            data-testid="test-earphones-image"
            className="relative w-full lg:w-[540px] min-h-[200px] rounded-xl overflow-hidden"
          >
            {/* Desktop */}
            <source
              media="(min-width: 1024px)"
              srcSet="/assets/home/desktop/image-earphones-yx1.jpg"
            />
            {/* Tablet */}
            <source
              media="(min-width: 640px)"
              srcSet="/assets/home/tablet/image-earphones-yx1.jpg"
            />
            {/* Mobile */}
            <Image
              src="/assets/home/mobile/image-earphones-yx1.jpg"
              alt="Earphones"
              fill
              priority
              className="mx-auto object-cover"
            />
          </picture>

          <div
            data-testid="test-earphones-text-container"
            className="bg-[#F1F1F1] flex flex-col justify-center gap-8 pl-6 lg:pl-[95px] w-full min-h-[200px] lg:w-[540px] rounded-xl"
          >
            <h4
              data-testid="test-earphones-title"
              className="font-bold text-[28px] leading-none tracking-[2px]"
            >
              YX1 EARPHONES
            </h4>
            <Link
              data-testid="test-earphones-link"
              href="#"
              aria-label="View YX1 Earphones product"
              className="flex items-center justify-center w-40 h-12 bg-transparent border border-black text-black hover:bg-black hover:text-white  font-bold text-[13px] uppercase tracking-[1px] cursor-pointer transition-all duration-200 ease-in-out"
            >
              See product
            </Link>
          </div>
        </section>
      </article>
    </>
  );
};

export default Categories;
