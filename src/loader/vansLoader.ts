import { getVans, getVanDetail } from "../api";
import { defer } from "react-router-dom";

export function vansPageLoader() {
  return defer({ vans: getVans() });
}

export function vanDetailPageLoader(vanId: string | undefined) {
  return defer({ vanDetails: getVanDetail(vanId ?? "") });
}
