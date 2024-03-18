import { Suspense } from "react";
import { Link, useLoaderData, Await } from "react-router-dom";

export default function HostVans() {
  const hostVansPromise = useLoaderData();

  const renderHostVans = (hostVans) => (
    <div className="grid grid-cols-1 gap-6 pt-6">
      {hostVans.map((vanData) => (
        <div
          key={vanData.id}
          className="flex bg-white items-center gap-6 p-6 rounded-lg shadow-sm"
        >
          <Link to={vanData.id}>
            <img
              src={vanData.imageUrl}
              alt={vanData.name}
              className="sm:w-36 w-20 rounded-md hover:outline outline-offset-2 outline-[1px]"
            />
          </Link>
          <div>
            <h1 className="text-base font-bold">{vanData.name}</h1>
            <span className="text-base font-semibold">
              ${vanData.price}/day
            </span>
          </div>
          <Link
            to={vanData.id}
            className="ml-auto text-sm font-semibold hover:underline"
          >
            Details
          </Link>
        </div>
      ))}
    </div>
  );

  return (
    <section className="text-[#161616] pb-8 md:px-0 px-4">
      <div className="container mx-auto">
        <h2 className="text-lg font-bold">Your listed vans</h2>
        <p className="text-lg font-light">
          Click on a van to see more details about it.
        </p>
        <Suspense
          fallback={
            <p className="text-xl font-bold mt-12">
              Loading host&apos;s vans data ...
            </p>
          }
        >
          <Await resolve={hostVansPromise.hostVans}>{renderHostVans}</Await>
        </Suspense>
      </div>
    </section>
  );
}
