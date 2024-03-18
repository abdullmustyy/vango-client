import { Link } from "react-router-dom";

export default function AboutPage() {
  return (
    <section className="about overflow-x-hidden font-inter">
      <header className="hero h-[70vh]"></header>
      <main className="container mx-auto text-[#161616] md:px-0 px-4 pt-8 pb-16">
        <div className="break-words space-y-8">
          <h1 className="text-5xl font-bold">
            Don&apos;t squeeze in a sedan when you could relax in a van.
          </h1>
          <p className="text-base font-medium">
            Our mission is to enliven your road trip with the perfect travel van
            rental. Our vans are recertified before each trip to ensure your
            travel plans can go off without a hitch. (Hitch costs extra 😉)
          </p>
          <p className="text-base font-medium">
            Our team is full of vanlife enthusiasts who know firsthand the magic
            of touring the world on 4 wheels.
          </p>
        </div>
        <aside className="bg-[#FFCC8D] mt-16 p-10 rounded-lg">
          <div className="break-words flex flex-col space-y-8">
            <h2 className="text-2xl font-bold">
              Your destination is waiting. Your van is ready.
            </h2>
            <Link
              to="/vans"
              className="bg-[#161616] opacity-100 hover:opacity-90 text-white text-base font-bold md:w-80 w-64 py-4 text-center rounded-lg transition"
            >
              Explore our vans
            </Link>
          </div>
        </aside>
      </main>
    </section>
  );
}
