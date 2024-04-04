import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const VansFiltersSkeleton = () => {
  return (
    <div className="flex items-center mt-4 mb-12 md:space-x-8 space-x-3">
      {[...Array(3)].map((_, index) => (
        <div key={index} className="md:space-x-8 space-x-3">
          <Skeleton width={100} height={30} />
        </div>
      ))}
    </div>
  );
};

export default VansFiltersSkeleton;
