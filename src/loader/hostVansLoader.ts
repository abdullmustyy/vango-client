import { getHostVans, getHostVanDetail } from "../api";
import { defer } from "react-router-dom";

export function hostVansPageLoader() {
  return defer({ hostVans: getHostVans() });
}

export function hostVanDetailPageLoader(vanId) {
  return defer({ hostVanDetails: getHostVanDetail(vanId) });
}
