import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const HostVanDetailSkeleton = () => {
  return (
    <section className="py-8 md:px-0 px-4">
      <header className="container mx-auto">
        <Skeleton width={111} height={24} />
      </header>
      <main className="container mx-auto">
        <div className="bg-white p-8 mt-8 rounded-lg space-y-6">
          <div className="flex md:space-x-10 space-x-6">
            <div className="w-fit rounded-l-lg">
              <Skeleton width={240} height={240} />
            </div>
            <div className="flex flex-col justify-center md:space-y-4 space-y-2">
              <Skeleton width={77} height={36} />
              <Skeleton width={185} height={36} />
              <Skeleton width={185} height={24} />
            </div>
          </div>
          <nav className="text-base text-[#161616] font-medium space-x-8 flex">
            <Skeleton width={50} height={21} />
            <Skeleton width={50} height={21} />
            <Skeleton width={50} height={21} />
          </nav>
          <section>
            <div className="text-[#161616] text-base font-semibold space-y-4">
              <Skeleton height={24} />
              <Skeleton height={24} />
              <Skeleton height={48} />
              <Skeleton height={24} />
            </div>
          </section>
        </div>
      </main>
    </section>
  );
};

export default HostVanDetailSkeleton;
