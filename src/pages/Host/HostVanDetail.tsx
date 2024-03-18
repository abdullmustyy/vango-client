import { useOutletContext } from "react-router-dom";
import { vansDetailsInterface } from "../../utils/interfaces/vans.interface";

export default function HostVanDetail() {
  const { hostVanDetails } = useOutletContext() as {
    hostVanDetails: vansDetailsInterface;
  };

  return (
    <section>
      <div className="text-[#161616] text-base font-semibold space-y-4">
        <p>
          <span className="font-bold">Name:</span> {hostVanDetails.name}
        </p>
        <p>
          <span className="font-bold">Category:</span> {hostVanDetails.type}
        </p>
        <p className="break-words">
          <span className="font-bold">Description:</span>{" "}
          {hostVanDetails.description}
        </p>
        <p>
          <span className="font-bold">Visibility:</span> Public
        </p>
      </div>
    </section>
  );
}
