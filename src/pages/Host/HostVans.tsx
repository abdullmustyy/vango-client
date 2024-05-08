import { Link } from "react-router-dom";
import { IGetVans, IVan } from "../../utils/interfaces/van.interface";
import { useQuery } from "@tanstack/react-query";
import { getHostVans } from "../../api";
import Error from "../../components/Error";
import HostVansSkeleton from "../../components/Host/Skeletons/HostVansSkeleton";
import { useCallback } from "react";
import { localStorageAuthValues } from "@/utils/auth.util";

export default function HostVans() {
  const { userId } = localStorageAuthValues();

  const { data, isPending, error, isError } = useQuery({
    queryKey: ["hostVans", userId],
    queryFn: ({ queryKey }) => getHostVans(queryKey[1] as string),
    select: useCallback((data: IGetVans) => {
      return data.data;
    }, []),
  });

  if (isPending) {
    return <HostVansSkeleton />;
  }

  if (isError) {
    return <Error error={error} />;
  }

  const renderHostVans = (hostVans: IVan[]) => (
    <div className="grid grid-cols-1 gap-6 pt-6">
      {hostVans.map((vanData) => (
        <div
          key={vanData.vanId}
          className="flex bg-white items-center gap-6 p-6 rounded-lg shadow-sm"
        >
          <Link to={vanData.vanId}>
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
            to={vanData.vanId}
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
