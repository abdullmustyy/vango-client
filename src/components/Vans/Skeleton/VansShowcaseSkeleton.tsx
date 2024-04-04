import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const VansShowcaseSkeleton = () => {
  return (
    <div className="grid grid-cols-2 sm:gap-12 gap-6">
      {[...Array(4)].map((_, index) => (
        <Skeleton key={index} width={488} height={488} />
      ))}
    </div>
  );
};

export default VansShowcaseSkeleton;
