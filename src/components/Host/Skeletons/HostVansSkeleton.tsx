import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const HostVansSkeleton = () => {
  return (
    <section className="text-[#161616] pb-8 md:px-0 px-4">
      <div className="container mx-auto">
        <Skeleton height={28} />
        <Skeleton height={28} />
        <div className="grid grid-cols-1 gap-6 pt-6">
          {[...Array(4)].map((_, index) => (
            <div
              key={index}
              className="flex bg-white items-center gap-6 p-6 rounded-lg shadow-sm"
            >
              <Skeleton width={144} height={144} />
              <Skeleton width={124} height={48} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HostVansSkeleton;
