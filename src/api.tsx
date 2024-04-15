import axios from "./utils/configs/axios.config";
import { IPostImage, IPostUser } from "./utils/interfaces/index.interface";
import { IGetVans, IGetVanDetail } from "./utils/interfaces/van.interface";

export async function GetVans() {
  return axios
    .get<IGetVans>("/vans")
    .then((vansResponse) => {
      const vansData = vansResponse.data;

      const processedData = vansData.data.map((data) => {
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
    })
    .catch((error) => {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log("Error while fetching vans: ", error.response.data);
        throw error.response.data; // Throw the error to ensure a value is returned
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log("Error while fetching vans: ", error.request);
        throw error.request; // Throw the error to ensure a value is returned
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error: ", error.message);
        throw error.message; // Throw the error to ensure a value is returned
      }
    });
}

export async function GetVanDetail(vanId: string) {
  return axios
    .get<IGetVanDetail>(`/vans/${vanId}`)
    .then((vanResponse) => {
      let data = vanResponse.data;

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
          type:
            data.data.type.charAt(0).toUpperCase() + data.data.type.slice(1),
        },
      };

      return data;
    })
    .catch((error) => {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log("Error while fetching van detail: ", error.response.data);
        throw error.response.data; // Throw the error to ensure a value is returned
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log("Error while fetching van detail: ", error.request);
        throw error.request; // Throw the error to ensure a value is returned
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error: ", error.message);
        throw error.message; // Throw the error to ensure a value is returned
      }
    });
}

export async function GetHostVans() {
  return axios
    .get<IGetVans>(`/host/b8a06866-3e78-41d5-b060-dffc1c98b55e/vans`)
    .then((hostVansResponse) => hostVansResponse.data)
    .catch((error) => {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log("Error while fetching host vans: ", error.response.data);
        throw error.response.data; // Throw the error to ensure a value is returned
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log("Error while fetching host vans: ", error.request);
        throw error.request; // Throw the error to ensure a value is returned
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error: ", error.message);
        throw error.message; // Throw the error to ensure a value is returned
      }
    });
}

export async function GetHostVanDetail(vanId: string) {
  return axios
    .get<IGetVanDetail>(
      `/host/b8a06866-3e78-41d5-b060-dffc1c98b55e/vans/${vanId}`
    )
    .then((hostVanResponse) => {
      let data = hostVanResponse.data;

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
          type:
            data.data.type.charAt(0).toUpperCase() + data.data.type.slice(1),
        },
      };

      return data;
    })
    .catch((error) => {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(
          "Error while fetching host van detail: ",
          error.response.data
        );
        throw error.response.data; // Throw the error to ensure a value is returned
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log("Error while fetching host van detail: ", error.request);
        throw error.request; // Throw the error to ensure a value is returned
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error: ", error.message);
        throw error.message; // Throw the error to ensure a value is returned
      }
    });
}

export async function UploadProfileImage(image: File) {
  const form = new FormData();
  form.append("image", image);

  return axios
    .post<IPostImage>("/upload-image", form)
    .then((imageResponse) => imageResponse.data)
    .catch((error) => {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log("Image upload error: ", error.response.data);
        throw error.response.data; // Throw the error to ensure a value is returned
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log("Image upload error: ", error.request);
        throw error.request; // Throw the error to ensure a value is returned
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error: ", error.message);
        throw error.message; // Throw the error to ensure a value is returned
      }
    });
}

export async function RegisterUser(
  name: string,
  imageUrl: string,
  email: string,
  username: string,
  password: string
): Promise<IPostUser> {
  return axios
    .post("/register", {
      name,
      imageUrl,
      email,
      username,
      password,
    })
    .then((userResponse) => userResponse.data)
    .catch((error) => {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log("Registration error: ", error.response.data);
        throw error.response.data; // Throw the error to ensure a value is returned
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log("Registration error: ", error.request);
        throw error.request; // Throw the error to ensure a value is returned
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error: ", error.message);
        throw error.message; // Throw the error to ensure a value is returned
      }
    });
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
