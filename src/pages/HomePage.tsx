import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <section className="home overflow-x-hidden font-inter">
      <main className="hero h-screen grid place-content-center">
        <div className="text-white break-words flex flex-col space-y-10 md:px-0 px-4 container mx-auto">
          <h1 className="text-6xl font-extrabold">
            You got the travel plans, we got the travel vans.
          </h1>
          <p className="text-lg font-extralight">
            Add adventure to your life by joining the VanGo movement. Rent the
            perfect van to make your perfect road trip.
          </p>
          <Link
            to="vans"
            className="bg-[#FF8C38] opacity-100 hover:opacity-90 text-lg font-bold md:w-96 w-80 py-3 text-center rounded-lg transition"
          >
            Find your van
          </Link>
        </div>
      </main>
    </section>
  );
}
