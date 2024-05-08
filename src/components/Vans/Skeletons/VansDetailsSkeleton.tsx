import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const VansDetailsSkeleton = () => {
  return (
    <section className="container mx-auto text-[#201F1D] sm:px-0 px-4">
      <header className="my-8">
        <Skeleton width={111} height={24} />
      </header>
      <main className="my-10 grid sm:grid-cols-2 gap-10">
        <section className="md:my-8">
          <div
            className={`rounded-full max-w-2xl`}
          >
            <Skeleton circle={true} width={492} height={492} />
          </div>
        </section>
        <section className="sm:flex items-center">
          <div className="flex flex-col sm:items-start items-center md:space-y-6 space-y-4">
            <span
              className={`md:px-8 px-6 md:py-2 py-1 text-white md:text-lg text-base font-semibold w-fit rounded-md`}
            >
              <Skeleton width={119} height={44} />
            </span>
            <h2 className="md:text-[2.5rem] text-2xl font-bold">
              <Skeleton width={310} height={32} />
            </h2>
            <span className="md:text-2xl text-xl font-bold">
              <Skeleton width={92} height={32} />
            </span>
            <p className="text-base font-medium break-words sm:text-start text-center">
              <Skeleton width={492} height={120} />
            </p>
            <Skeleton width={246} height={52} />
          </div>
        </section>
      </main>
    </section>
  );
};

export default VansDetailsSkeleton;
