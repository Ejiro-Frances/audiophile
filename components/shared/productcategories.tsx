import Link from "next/link";
import Image from "next/image";
import { MdKeyboardArrowRight } from "react-icons/md";

const ProductCategories = () => {
  const categories = [
    {
      image: "/assets/home/desktop/headphones.svg",
      title: "Headphones",
      href: "/headphones",
    },
    {
      image: "/assets/home/desktop/image-speaker-zx9.png",
      title: "Speakers",
      href: "/speakers",
    },
    {
      image: "/assets/home/desktop/earphones.svg",
      title: "Earphones",
      href: "/earphones",
    },
  ];

  return (
    <section
      data-testid="test-categories-section"
      aria-label="Product categories"
      className="flex flex-col justify-end max-w-[1110px] mx-auto mt-10"
    >
      {/* md:h-[284px] */}
      <div
        data-testid="test-categories-grid"
        className="grid grid-cols-1 sm:grid-cols-3 justify-center gap-16 sm:gap-8"
        role="list"
        aria-label="Category list"
      >
        {categories.map((category, i) => (
          <article
            key={i}
            data-testid={`test-category-${category.title.toLowerCase()}`}
            aria-label={`${category.title} category`}
            className="relative flex flex-col items-center w-[90%] sm:w-full h-[165px] lg:h-[204px] mx-auto bg-[#f1f1f1] rounded-xl"
            role="listitem"
          >
            {/* Product image */}
            <div
              data-testid={`test-category-image-container-${category.title.toLowerCase()}`}
              className={`relative ${
                i === 0
                  ? "w-[79.92px] lg:w-[122.95px] h-[104px] lg:h-40 -mt-[52px] lg:-mt-20"
                  : i === 1
                    ? "w-[84.04px] lg:w-[121.49px] h-[101px] lg:h-[146px] -mt-[52px] lg:-mt-[72.5px]"
                    : "w-[103px] lg:w-[125px] h-[104px] lg:h-[126px] -mt-[52px] lg:-mt-[59px]"
              }`}
            >
              <Image
                src={category.image}
                alt={`Image of ${category.title}`}
                fill
                className="object-contain"
                priority
              />
            </div>

            <div>
              {/* Shadow */}
              <div
                data-testid={`test-category-shadow-${category.title.toLowerCase()}`}
                className="w-[90px] h-[18px] bg-black/50 blur-lg rounded-full -translate-y-6"
                aria-hidden="true"
              />
            </div>
            {/* Title */}
            <h2
              data-testid={`test-category-title-${category.title.toLowerCase()}`}
              className="text-[15px] lg:text-lg leading-none text-center font-bold uppercase tracking-[1.07px] lg:tracking-[1.29px] my-[15px]"
            >
              {category.title}
            </h2>
            {/* Link */}
            <Link
              data-testid={`test-category-link-${category.title.toLowerCase()}`}
              href={category.href}
              aria-label={`Shop ${category.title}`}
              className="text-[13px] font-bold text-black/50 hover:text-primary tracking-[1px] uppercase transition-all duration-300 ease-in-out flex items-center"
            >
              Shop
              <span
                data-testid={`test-category-arrow-${category.title.toLowerCase()}`}
                className="ml-[13.32px] text-primary"
                aria-hidden="true"
              >
                <MdKeyboardArrowRight className="size-5" />
              </span>
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
};

export default ProductCategories;
