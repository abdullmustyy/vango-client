import { createContext } from "react";
import { useAppDispatch } from "../../app/hooks";
import { setFilterOptions } from "../../state/vansSlice";
import VansFilters from "../../components/Vans/VansFilters";
import VansShowcase from "../../components/Vans/VansShowcase";
import { vansInterface } from "../../utils/interfaces/vans.interface";
import { useQuery } from "@tanstack/react-query";
import { GetVans } from "../../Api";
import VansFiltersSkeleton from "../../components/Vans/Skeleton/VansFiltersSkeleton";
import VansShowcaseSkeleton from "../../components/Vans/Skeleton/VansShowcaseSkeleton";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export const VansContext = createContext({} as { vansData: vansInterface[] });

export default function VansPage() {
  const dispatch = useAppDispatch();

  const { data, error, isPending, isError } = useQuery({
    queryKey: ["vans"],
    queryFn: GetVans,
  });

  if (isPending) {
    return (
      <section className="container mx-auto my-12 md:px-0 px-4 text-[#161616] min-h-screen">
        <header className="mb12 space-y-2">
          <Skeleton />
          <Skeleton />
        </header>
        <main>
          <VansFiltersSkeleton />
          <VansShowcaseSkeleton />
        </main>
      </section>
    );
  }

  if (isError) {
    return (
      <div className="container mx-auto md:px-0 px-4 h-screen grid place-content-center">
        <span>Error: {error.message}</span>
      </div>
    );
  }

  const renderVansData = (vansData: vansInterface[]) => {
    const vansTypes = vansData.map((van, index) => ({
      id: index,
      type: van.type,
      buttonStyle: van.buttonStyle,
    }));
    const options = vansTypes
      .sort((a, b) => {
        const typeA = a.type.toUpperCase();
        const typeB = b.type.toUpperCase();
        return typeA < typeB ? -1 : typeA > typeB ? 1 : 0;
      })
      .filter((data, index, arr) => data.type !== arr[index - 1]?.type);
    dispatch(setFilterOptions(options));

    return (
      <>
        <main>
          <VansFilters />
          <VansContext.Provider value={{ vansData }}>
            <VansShowcase />
          </VansContext.Provider>
        </main>
      </>
    );
  };

  return (
    <section className="container mx-auto my-12 md:px-0 px-4 text-[#161616] min-h-screen">
      <header className="mb12 space-y-2">
        <h1 className="text-[2rem] font-semibold">Explore our van options</h1>
        <p className="text-lg font-light">
          Pick a van you&apos;ll like to rent by clicking on it.
        </p>
      </header>
      {renderVansData(data ?? [])}
    </section>
  );
}
