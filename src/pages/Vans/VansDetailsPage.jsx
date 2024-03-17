import { Suspense } from "react";
import { Link, useLocation, useLoaderData, Await } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";

export default function VansDetailsPage() {
  const vanDetailsPromise = useLoaderData();
  const { state } = useLocation();

  const renderVanDetails = (vanDetails) => (
    <main className="my-10 grid sm:grid-cols-2 gap-10">
      <section className="md:my-8">
        <div
          className={`outline-${vanDetails.typeBg} rounded-full max-w-2xl outline outline-offset-1 outline-[1px]`}
        >
          <img
            src={vanDetails.imageUrl}
            alt={vanDetails.name}
            className="w-fit rounded-full object-center"
          />
        </div>
      </section>
      <section className="sm:flex items-center">
        <div className="flex flex-col sm:items-start items-center md:space-y-6 space-y-4">
          <span
            className={`bg-${vanDetails.typeBg} md:px-8 px-6 md:py-2 py-1 text-white md:text-lg text-base font-semibold w-fit rounded-md`}
          >
            {vanDetails.type}
          </span>
          <h2 className="md:text-[2.5rem] text-2xl font-bold">{vanDetails.name}</h2>
          <span className="md:text-2xl text-xl font-bold">${vanDetails.price}/day</span>
          <p className="text-base font-medium break-words sm:text-start text-center">
            {vanDetails.description}
          </p>
          <button
            className={`bg-${vanDetails.typeBg} text-white text-lg font-bold w-1/2 md:py-3 py-2 rounded-lg opacity-100 hover:opacity-90`}
          >
            Rent this van
          </button>
        </div>
      </section>
    </main>
  );

  return (
    <section className="container mx-auto text-[#201F1D] sm:px-0 px-4">
      <header className="my-8">
        <Link
          to={state.search ? `..?${state.search}` : ".."}
          relative="path"
          className="flex items-center space-x-4 text-base font-medium underline"
        >
          <FaArrowLeftLong />
          <h2>
            Back to {state.values.length > 0 ? state.values.toString() : "all"}{" "}
            vans
          </h2>
        </Link>
      </header>
      <Suspense
        fallback={
          <p className="text-xl font-bold my-12">Loading vans details ...</p>
        }
      >
        <Await resolve={vanDetailsPromise.vanDetails}>{renderVanDetails}</Await>
      </Suspense>
    </section>
  );
}
