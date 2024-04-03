import { GetVans, GetVanDetail } from "../Api";
import { defer } from "react-router-dom";

export function vansPageLoader() {
  return defer({ vans: GetVans() });
}

export function vanDetailPageLoader(vanId: string | undefined) {
  return defer({ vanDetails: GetVanDetail(vanId ?? "") });
}
