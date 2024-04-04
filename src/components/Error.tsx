import { FaFaceFrown } from "react-icons/fa6";

export default function Error({ error }: { error: Error | null }) {
  return (
    <section className="container mx-auto my-40 space-y-4 min-h-screen">
      <FaFaceFrown size={"3rem"} />
      <h2 className="text-4xl font-bold">
        <span className="font-black">Error:</span> {error && error.message}
      </h2>
    </section>
  );
}
