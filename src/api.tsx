import axios from "./utils/configs/axios.config";
import {
  vansInterface,
  vansDetailsInterface,
} from "./utils/interfaces/van.interface";

export async function GetVans() {
  try {
    const vansResponse = await axios.get("/vans");

    if (vansResponse.statusText !== "OK") {
      throw new Error("Failed to fetch vans data");
    }

    const vansData: { data: vansInterface[] } = vansResponse.data;

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
  try {
    const vanResponse = await axios.get(`/vans/${vanId}`);

    if (vanResponse.statusText !== "OK") {
      throw new Error("Failed to fetch van detail");
    }

    let data: { data: vansDetailsInterface } = vanResponse.data;

    data = {
      ...data,
      data: {
        ...data.data,
        typeBg:
          data.data.type === "simple"
            ? "[#E17654]"
            : data.data.type === "luxury"
              ? "[#161616]"
              : "[#115E59]",
        type: data.data.type.charAt(0).toUpperCase() + data.data.type.slice(1),
      },
    };

    return data;
  } catch (error) {
    console.error("Error fetching van detail: ", error);
    throw error;
  }
}

export async function GetHostVans() {
  try {
    const hostVansResponse = await axios.get(
      `/host/b8a06866-3e78-41d5-b060-dffc1c98b55e/vans`
    );

    if (hostVansResponse.statusText !== "OK") {
      throw new Error("Failed to fetch host vans data");
    }

    const hostVansData: { data: vansInterface[] } = hostVansResponse.data;

    return hostVansData.data;
  } catch (error) {
    console.error("Error fetching host vans data: ", error);
    throw error;
  }
}

export async function GetHostVanDetail(vanId: string) {
  try {
    const hostVanResponse = await axios.get(
      `/host/b8a06866-3e78-41d5-b060-dffc1c98b55e/vans/${vanId}`
    );

    if (hostVanResponse.statusText !== "OK") {
      throw new Error("Failed to fetch host van detail");
    }

    let data: { data: vansDetailsInterface } = hostVanResponse.data;

    data = {
      ...data,
      data: {
        ...data.data,
        typeBg:
          data.data.type === "simple"
            ? "[#E17654]"
            : data.data.type === "luxury"
              ? "[#161616]"
              : "[#115E59]",
        type: data.data.type.charAt(0).toUpperCase() + data.data.type.slice(1),
      },
    };

    return data;
  } catch (error) {
    console.error("Error fetching host van detail: ", error);
    throw error;
  }
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
