import { createContext } from "react";
import { useAppDispatch } from "../../app/hooks";
// import { useLoaderData, Await } from "react-router-dom";
import { setFilterOptions } from "../../state/vansSlice";
import VansFilters from "../../components/Vans/VansFilters";
import VansShowcase from "../../components/Vans/VansShowcase";
import { vansInterface } from "../../utils/interfaces/vans.interface";
import { useQuery } from "@tanstack/react-query";
import { GetVans } from "../../Api";

export const VansContext = createContext({} as { vansData: vansInterface[] });

export default function VansPage() {
  const dispatch = useAppDispatch();
  // const vansDataPromise = useLoaderData();

  const { data, error, isPending, isError } = useQuery({
    queryKey: ["vans"],
    queryFn: GetVans,
  });

  if (isPending) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  const renderVansData = (vansData: vansInterface[]) => {
    console.log("Vans Data: ", vansData);
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
