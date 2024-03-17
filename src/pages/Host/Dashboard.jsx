import { Suspense } from "react";
import { Link, Await, useLoaderData } from "react-router-dom";
import { BsStarFill } from "react-icons/bs";

export default function Dashboard() {
  const hostVansPromise = useLoaderData();

  function renderVanElements(vans) {
    const hostVansEls = vans.map((van) => (
      <div
        className="bg-white flex items-center gap-6 p-6 rounded-lg shadow-sm"
        key={van.id}
      >
        <img
          src={van.imageUrl}
          alt={`Photo of ${van.name}`}
          className="sm:w-36 w-20 rounded-md"
        />
        <div>
          <h3 className="text-base font-bold">{van.name}</h3>
          <p className="text-base font-semibold">${van.price}/day</p>
        </div>
        <Link
          to={`vans/${van.id}`}
          className="ml-auto text-sm font-semibold hover:underline"
        >
          View
        </Link>
      </div>
    ));

    return <section className="space-y-4 pb-6">{hostVansEls}</section>;
  }

  return (
    <main className="text-[#161616] md:px-0 px-4">
      <section className="container mx-auto">
        <section className="flex justify-between items-center bg-[#FFEAD0] p-6 rounded-t-2xl shadow-inne">
          <div className="space-y-4">
            <h1 className="text-2xl font-bold">Welcome!</h1>
            <p className="text-base font-normal">
              Income last <span className="font-medium underline">30 days</span>
            </p>
            <h2 className="text-3xl font-bold">$2,260</h2>
          </div>
          <Link to="income" className="text-sm font-semibold hover:underline">
            Details
          </Link>
        </section>
        <section className="flex justify-between items-center bg-[#FFDDB2] p-6 shadow-inne">
          <div className="flex items-center">
            <h2 className="text-lg font-bold mr-4">Review score</h2>
            <BsStarFill className="text-[#FF8C38] mr-1" />
            <p className="text-base font-thin">
              <span className="font-semibold">5.0</span>/5
            </p>
          </div>
          <Link to="reviews" className="text-sm font-semibold hover:underline">
            Details
          </Link>
        </section>
        <section className="host-dashboard-vans">
          <div className="flex justify-between p-6">
            <h2 className="text-lg font-bold">Your listed vans</h2>
            <Link to="vans" className="text-sm font-semibold hover:underline">
              View all
            </Link>
          </div>
          <Suspense
            fallback={
              <h3 className="text-xl font-bold my-12">
                Loading host&apos;s vans data ...
              </h3>
            }
          >
            <Await resolve={hostVansPromise.hostVans}>
              {renderVanElements}
            </Await>
          </Suspense>
        </section>
      </section>
    </main>
  );
}
