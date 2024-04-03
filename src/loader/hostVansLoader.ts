import { GetHostVans, GetHostVanDetail } from "../Api";
import { defer } from "react-router-dom";

export function hostVansPageLoader() {
  return defer({ hostVans: GetHostVans() });
}

export function hostVanDetailPageLoader(vanId: string | undefined) {
  return defer({ hostVanDetails: GetHostVanDetail(vanId ?? "") });
}
