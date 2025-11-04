"use client";

import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <button
      onClick={handleBack}
      className="mt-4 mb-8 text-[15px] leading-[25px] font-normal text-black/50 hover:text-black transition"
    >
      Go Back
    </button>
  );
}
