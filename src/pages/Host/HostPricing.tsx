import { useOutletContext } from "react-router-dom";
import { vansDetailsInterface } from "../../utils/interfaces/van.interface";

export default function HostPricing() {
  const { hostVanDetails } = useOutletContext() as {
    hostVanDetails: vansDetailsInterface;
  };

  return (
    <section>
      <span className="text-[#161616] text-2xl font-semibold">
        ${hostVanDetails.price}/day
      </span>
    </section>
  );
}
