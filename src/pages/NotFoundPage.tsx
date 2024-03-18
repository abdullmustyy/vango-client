import { Link } from "react-router-dom";
import { FaFaceFrown } from "react-icons/fa6";

export default function NotFoundPage() {
  return (
    <section className="container mx-auto py-40 md:px-0 px-4">
      <div className="flex flex-col justify-center items-center text-[#161616] space-y-6">
        <FaFaceFrown size={"3rem"} />
        <h1 className="text-4xl font-black text-center">
          Sorry, the page you searched for was not found.
        </h1>
        <Link
          to=".."
          className="bg-[#161616] text-white font-bold w-fit  sm:px-20 sm:py-4 py-2 px-3 rounded-lg hover:outline outline-2 outline-[#161616]"
        >
          Return to home
        </Link>
      </div>
    </section>
  );
}
