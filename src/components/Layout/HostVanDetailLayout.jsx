import { Suspense } from "react";
import { Link, NavLink, Outlet, useLoaderData, Await } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";

export default function HostVanDetailLayout() {
  const hostVanDetailsPromise = useLoaderData();

  const activeStyle = {
    color: "black",
    textDecoration: "underline",
  };

  const renderHostVanDetails = (hostVanDetails) => (
    <div className="bg-white p-8 mt-8 rounded-lg space-y-6">
      <div className="flex md:space-x-10 space-x-6">
        <div className="w-fit rounded-l-lg">
          <img
            src={hostVanDetails.imageUrl}
            alt={hostVanDetails.name}
            className="md:w-60 w-28 object-cover rounded-l-lg"
          />
        </div>
        <div className="flex flex-col justify-center md:space-y-4 space-y-2">
          <span
            className={`bg-${hostVanDetails.typeBg} md:px-4 px-2 md:py-2 py-[0.1rem] text-white text-sm md:font-bold font-semibold w-fit rounded-md`}
          >
            {hostVanDetails.type}
          </span>
          <h1 className="text-[#161616] md:text-[2rem] text-2xl font-bold">
            {hostVanDetails.name}
          </h1>
          <span className="text-[#161616] text-base font-semibold">
            ${hostVanDetails.price}/day
          </span>
        </div>
      </div>
      <nav className="text-base text-[#161616] font-medium space-x-8">
        <NavLink
          end
          to="."
          style={({ isActive }) => (isActive ? activeStyle : null)}
          className="hover:text-black hover:font-semibold hover:underline transition"
        >
          Details
        </NavLink>
        <NavLink
          to="pricing"
          style={({ isActive }) => (isActive ? activeStyle : null)}
          className="hover:text-black hover:font-semibold hover:underline transition"
        >
          Pricing
        </NavLink>
        <NavLink
          to="photos"
          style={({ isActive }) => (isActive ? activeStyle : null)}
          className="hover:text-black hover:font-semibold hover:underline transition"
        >
          Photos
        </NavLink>
      </nav>
      <Outlet context={{ hostVanDetails }} />
    </div>
  );

  return (
    <section className="py-8 md:px-0 px-4">
      <header className="container mx-auto">
        <Link
          to="../vans"
          // relative="path"
          className="flex items-center space-x-4 text-base font-medium underline w-fit"
        >
          <FaArrowLeftLong />
          <h2>Back to all vans</h2>
        </Link>
      </header>
      <main className="container mx-auto">
        <Suspense
          fallback={
            <p className="text-xl font-bold mt-12">
              Loading host&apos;s van details ...
            </p>
          }
        >
          <Await resolve={hostVanDetailsPromise.hostVanDetails}>
            {renderHostVanDetails}
          </Await>
        </Suspense>
      </main>
    </section>
  );
}
