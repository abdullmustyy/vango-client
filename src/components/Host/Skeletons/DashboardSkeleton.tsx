import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const DashboardSkeleton = () => {
  return (
    <main className="text-[#161616] md:px-0 px-4">
      <section className="container mx-auto">
        <section className="flex justify-between items-center bg-[#FFEAD0] p-6 rounded-t-2xl shadow-inne">
          <div className="space-y-4">
            <Skeleton width={140} height={32} />
            <Skeleton width={140} height={32} />
            <Skeleton width={140} height={32} />
          </div>
          <Skeleton width={43} height={20} />
        </section>
        <section className="flex justify-between items-center bg-[#FFDDB2] p-6 shadow-inne">
          <div className="flex items-center">
            <Skeleton width={181} height={28} />
          </div>
          <Skeleton width={43} height={20} />
        </section>
        <section className="host-dashboard-vans">
          <div className="flex justify-between p-6">
            <Skeleton width={132} height={28} />
            <Skeleton width={49} height={28} />
          </div>
          {[...Array(4)].map((_, index) => (
            <div
              className="bg-white flex items-center gap-6 p-6 rounded-lg shadow-sm"
              key={index}
            >
              <Skeleton width={144} height={144} />
              <Skeleton width={124} height={48} />
              <Skeleton width={30} height={28} />
            </div>
          ))}
        </section>
      </section>
    </main>
  );
};

export default DashboardSkeleton;
