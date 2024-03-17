import { useOutletContext } from "react-router-dom";

export default function HostPricing() {
  const { hostVanDetails } = useOutletContext();

  return (
    <section>
      <span className="text-[#161616] text-2xl font-semibold">
        ${hostVanDetails.price}/day
      </span>
    </section>
  );
}
