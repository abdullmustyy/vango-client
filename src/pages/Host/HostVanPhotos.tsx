import { useOutletContext } from "react-router-dom";
import { vansDetailsInterface } from "../../utils/interfaces/van.interface";

export default function HostVanPhotos() {
  const { hostVanDetails } = useOutletContext() as {
    hostVanDetails: vansDetailsInterface;
  };

  return (
    <section>
      <div className="w-fit rounded-lg">
        <img
          src={hostVanDetails.imageUrl}
          alt={hostVanDetails.name}
          className="md:w-40 w-32 object-cover rounded-lg"
        />
      </div>
    </section>
  );
}
