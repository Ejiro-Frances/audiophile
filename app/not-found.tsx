import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-center px-4">
      <h1 className="text-5xl font-bold mb-4">404</h1>
      <p className="text-lg text-black/60 mb-8">
        The page you’re looking for doesn’t exist.
      </p>
      <Link
        href="/"
        className="px-6 py-3 bg-primary text-white uppercase font-bold text-sm tracking-wider rounded-md hover:bg-[#FBAF85] transition-all"
      >
        Go Back Home
      </Link>
    </div>
  );
}
