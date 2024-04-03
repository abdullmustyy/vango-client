import { db } from "./firebase";
import {
  getDocs,
  getDoc,
  doc,
  collection,
  query,
  where,
} from "firebase/firestore/lite";
import {
  vansInterface,
  vansDetailsInterface,
} from "./utils/interfaces/vans.interface";

const vansCollectionRef = collection(db, "vans");

export async function GetVans() {
  try {
    const vansResponse = await fetch(`${import.meta.env.BASE_URL}/vans`);

    if (!vansResponse.ok) {
      throw new Error("Failed to fetch vans data");
    }

    const vansData: { data: vansInterface[] } = await vansResponse.json();

    const processedData = vansData?.data.map((data) => {
      const buttonStyle =
        data.type === "simple"
          ? "bg-[#E17654] text-white hover:outline hover:outline-2 hover:outline-[#E17654]"
          : data.type === "luxury"
            ? "bg-[#161616] text-white hover:outline hover:outline-2 hover:outline-[#161616]"
            : "bg-[#115E59] text-white hover:outline hover:outline-2 hover:outline-[#115E59]";
      return {
        ...data,
        buttonStyle: buttonStyle,
        type: data.type.charAt(0).toUpperCase() + data.type.slice(1),
      };
    });

    return processedData;
  } catch (error) {
    console.error("Error fetching vans data: ", error);
    throw error;
  }
}

export async function GetVanDetail(vanId: string) {
  const vanRef = doc(db, "vans", vanId);
  const vanShot = await getDoc(vanRef);
  let data = vanShot.data() as vansDetailsInterface;

  data = {
    ...data,
    typeBg:
      data.type === "simple"
        ? "[#E17654]"
        : data.type === "luxury"
          ? "[#161616]"
          : "[#115E59]",
    type: data.type.charAt(0).toUpperCase() + data.type.slice(1),
  };

  return data;
}

export async function GetHostVans() {
  const q = query(vansCollectionRef, where("hostId", "==", "123"));
  const querySnapshot = await getDocs(q);
  const data = querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));

  return data;
}

export async function GetHostVanDetail(vanId: string) {
  const hostVanRef = doc(db, "vans", vanId);
  const hostVanShot = await getDoc(hostVanRef);
  let data = hostVanShot.data() as vansDetailsInterface;

  data = {
    ...data,
    typeBg:
      data.type === "simple"
        ? "[#E17654]"
        : data.type === "luxury"
          ? "[#161616]"
          : "[#115E59]",
    type: data.type.charAt(0).toUpperCase() + data.type.slice(1),
  };

  return data;
}

export async function LoginUser(creds: { email: string; password: string }) {
  const res = await fetch("/api/login", {
    method: "post",
    body: JSON.stringify(creds),
  });
  const data = await res.json();

  if (!res.ok) {
    throw {
      message: data.message,
      statusText: res.statusText,
      status: res.status,
    };
  }

  return data;
}
