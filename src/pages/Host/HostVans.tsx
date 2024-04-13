import { Link } from "react-router-dom";
import { vansInterface } from "../../utils/interfaces/van.interface";
import { useQuery } from "@tanstack/react-query";
import { GetHostVans } from "../../Api";
import Error from "../../components/Error";
import HostVansSkeleton from "../../components/Host/Skeletons/HostVansSkeleton";

export default function HostVans() {
  const { data, isPending, error, isError } = useQuery({
    queryKey: ["hostVans"],
    queryFn: GetHostVans,
  });

  if (isPending) {
    return <HostVansSkeleton />;
  }

  if (isError) {
    return <Error error={error} />;
  }

  const renderHostVans = (hostVans: vansInterface[]) => (
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
        {data && renderHostVans(data)}
      </div>
    </section>
  );
}
