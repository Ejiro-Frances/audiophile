"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { navLinks } from "@/constants/navlinks";
import { IoLogoFacebook } from "react-icons/io";
import { BsInstagram, BsTwitter } from "react-icons/bs";

const Footer = () => {
  const pathname = usePathname();

  return (
    <article data-testid="test-footer-container">
      {/* BEST AUDIO GEAR */}
      {pathname !== "/checkout" && (
        <section
          data-testid="test-best-audio-gear-container"
          aria-label="Best audio gear section"
          className="grid grid-cols-1 lg:grid-cols-2 items-center gap-10 md:gap-[63px] lg:gap-[125px] max-w-[90%] lg:max-w-[1110px] mx-auto mb-[133px]"
        >
          {/* image first on mobile, second on desktop */}
          {/* <div
          data-testid="test-best-audio-gear-image-container"
          className="relative order-1 md:order-2 flex justify-center"
        >
          <Image
            data-testid="test-best-audio-gear-image"
            src="/assets/man.png"
            alt="A man using a headphone"
            width={540}
            height={588}
            priority
            className="rounded-xl"
          />
        </div> */}
          <picture
            data-testid="test-best-audio-gear-image-container"
            className="relative order-1 lg:order-2 flex justify-center"
          >
            {/* Desktop */}
            <source
              media="(min-width: 1024px)"
              srcSet="/assets/shared/desktop/image-best-gear.jpg"
            />
            {/* Tablet */}
            <source
              media="(min-width: 640px)"
              srcSet="/assets/shared/desktop/image-best-gear.jpg"
            />
            {/* Mobile */}
            <img
              src="/assets/shared/desktop/image-best-gear.jpg"
              alt="Best gear image"
              // fill
              // priority
              className="w-full md:h-[300px] object-cover rounded-xl"
            />
          </picture>

          {/* text second on mobile, first on desktop */}
          <div
            data-testid="test-best-audio-gear-text"
            className="space-y-8 w-full md:w-[573px] lg:w-[445px] order-2 lg:order-1 text-center lg:text-left mx-auto"
          >
            <h5
              data-testid="test-best-audio-gear-title"
              className="text-[28px] md:text-[40px] leading-none md:leading-11 tracking-[1px] lg:tracking-[1.43px] font-bold uppercase"
            >
              Bringing you the <span className="text-primary">best</span> audio
              gear
            </h5>

            <p
              data-testid="test-best-audio-gear-description"
              className="text-[15px] leading-[25px] text-black/50"
            >
              Located at the heart of New York City, Audiophile is the premier
              store for high end headphones, earphones, speakers, and audio
              accessories. We have a large showroom and luxury demonstration
              rooms available for you to browse and experience a wide range of
              our products. Stop by our store to meet some of the fantastic
              people who make Audiophile the best place to buy your portable
              audio equipment.
            </p>
          </div>
        </section>
      )}

      {/* footer with links */}
      <footer className="bg-[#101010] md:pt-[75px]">
        <div className="relative max-w-full md:max-w-[1110px] mx-[39px] lg:mx-auto py-10">
          <div className="absolute top-0 left-1/2 md:left-[39px] -translate-x-1/2 bg-primary w-[101px] h-1" />

          {/* logo and links */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-12 mb-9">
            <Link href="/" className="relative">
              <Image
                data-testid="test-footer-logo"
                src="/logo.svg"
                alt="Audiophile logo"
                width={143}
                height={40}
              />
            </Link>

            {/* Navigation */}
            <nav>
              <ul
                data-testid="test-footer-nav-links"
                className="flex flex-col md:flex-row items-center gap-4 md:gap-8 uppercase font-bold text-[13px] leading-[25px] tracking-[2px]"
              >
                {navLinks.map(({ name, href }) => {
                  return (
                    <li key={name} data-testid={`test-footer-nav-link-${name}`}>
                      <Link
                        href={href}
                        className="transition-colors cursor-pointer text-white hover:text-primary"
                      >
                        {name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>

          {/* footer description  */}
          <p
            data-testid="test-footer-description"
            className="w-[327px] md:w-full lg:w-[540px] mx-auto md:mx-0 text-white/50 text-[15px] leading-[25px] text-center md:text-left"
          >
            Audiophile is an all in one stop to fulfill your audio needs. We’re
            a small team of music lovers and sound specialists who are devoted
            to helping you get the most out of personal audio. Come and visit
            our demo facility - we’re open 7 days a week.
          </p>

          {/* copy right and social links */}
          <div className="flex flex-col md:flex-row justify-between items-center lg:items-end gap-12 mt-12">
            <p
              data-testid="test-footer-copyright"
              className="text-white/50 text-[15px] leading-[25px] text-center lg:text-left"
            >
              Copyright 2021. All Rights Reserved
            </p>
            <nav className="flex items-center gap-4">
              <a
                href="#"
                className="text-white hover:text-primary cursor-pointer transition-all duration-200 ease-in-out"
              >
                <IoLogoFacebook className="w-6 h-6" />
              </a>
              <a
                href="#"
                className="text-white hover:text-primary cursor-pointer transition-all duration-200 ease-in-out"
              >
                <BsTwitter className="w-6 h-[19.5px]" />
              </a>
              <a
                href="#"
                className="text-white hover:text-primary cursor-pointer transition-all duration-200 ease-in-out"
              >
                <BsInstagram className="w-6 h-6" />
              </a>
            </nav>
          </div>
        </div>
      </footer>
    </article>
  );
};

export default Footer;
