import { getHostVans, getHostVanDetail } from "../api";
import { defer } from "react-router-dom";

export function hostVansPageLoader() {
  return defer({ hostVans: getHostVans() });
}

export function hostVanDetailPageLoader(vanId: string | undefined) {
  return defer({ hostVanDetails: getHostVanDetail(vanId ?? "") });
}
