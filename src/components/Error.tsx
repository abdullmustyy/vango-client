import { FaFaceFrown } from "react-icons/fa6";

import { useRouteError } from "react-router-dom";

export default function Error() {
  const error = useRouteError() as Error & {
    status: number;
    statusText: string;
  };
  return (
    <section className="container mx-auto my-40 space-y-4 min-h-screen">
      <FaFaceFrown size={"3rem"} />
      <h2 className="text-4xl font-bold">
        <span className="font-black">Error:</span> {error.message}
      </h2>
      <pre className="text-base font-thin">
        {error.status} - {error.statusText}
      </pre>
    </section>
  );
}
