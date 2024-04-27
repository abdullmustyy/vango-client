import { axios } from "./utils/configs/axios.config";
import {
  IPostEmailAndOtp,
  IPostImage,
  IPostUser,
} from "./utils/interfaces/api.interface";
import { IGetVans, IGetVanDetail } from "./utils/interfaces/van.interface";

export async function getVans() {
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
        console.error("Error while fetching vans: ", error.response.data);
        throw error.response.data; // Throw the error to ensure a value is returned
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.error("Error while fetching vans: ", error.request);
        throw error.request; // Throw the error to ensure a value is returned
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error: ", error.message);
        throw error.message; // Throw the error to ensure a value is returned
      }
    });
}

export async function getVanDetail(vanId: string) {
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
        console.error("Error while fetching van detail: ", error.response.data);
        throw error.response.data; // Throw the error to ensure a value is returned
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.error("Error while fetching van detail: ", error.request);
        throw error.request; // Throw the error to ensure a value is returned
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error: ", error.message);
        throw error.message; // Throw the error to ensure a value is returned
      }
    });
}

export async function getHostVans() {
  return axios
    .get<IGetVans>(`/host/b8a06866-3e78-41d5-b060-dffc1c98b55e/vans`)
    .then((hostVansResponse) => hostVansResponse.data)
    .catch((error) => {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error("Error while fetching host vans: ", error.response.data);
        throw error.response.data; // Throw the error to ensure a value is returned
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.error("Error while fetching host vans: ", error.request);
        throw error.request; // Throw the error to ensure a value is returned
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error: ", error.message);
        throw error.message; // Throw the error to ensure a value is returned
      }
    });
}

export async function getHostVanDetail(vanId: string) {
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
        console.error(
          "Error while fetching host van detail: ",
          error.response.data
        );
        throw error.response.data; // Throw the error to ensure a value is returned
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.error("Error while fetching host van detail: ", error.request);
        throw error.request; // Throw the error to ensure a value is returned
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error: ", error.message);
        throw error.message; // Throw the error to ensure a value is returned
      }
    });
}

export async function uploadProfileImage(image: File) {
  const form = new FormData();
  form.append("image", image);

  return axios
    .post<IPostImage>("/upload-image", form)
    .then((imageResponse) => imageResponse.data)
    .catch((error) => {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error("Image upload error: ", error.response.data);
        throw error.response.data; // Throw the error to ensure a value is returned
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.error("Image upload error: ", error.request);
        throw error.request; // Throw the error to ensure a value is returned
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error: ", error.message);
        throw error.message; // Throw the error to ensure a value is returned
      }
    });
}

export async function signUpUser(
  name: string,
  imageUrl: string,
  email: string,
  username: string,
  password: string
): Promise<IPostUser> {
  return axios
    .post("/auth/signup", {
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
        console.error("Registration error: ", error.response.data);
        throw error.response.data; // Throw the error to ensure a value is returned
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.error("Registration error: ", error.request);
        throw error.request; // Throw the error to ensure a value is returned
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error: ", error.message);
        throw error.message; // Throw the error to ensure a value is returned
      }
    });
}

export async function verifyEmailAndOtp(
  email: string,
  otp: string
): Promise<IPostEmailAndOtp> {
  return axios
    .post("/auth/verify", {
      email,
      otp,
    })
    .then((otpResponse) => otpResponse.data)
    .catch((error) => {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error("Email & Otp verification error: ", error.response.data);
        throw error.response.data; // Throw the error to ensure a value is returned
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.error("Email & Otp verification error: ", error.request);
        throw error.request; // Throw the error to ensure a value is returned
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error: ", error.message);
        throw error.message; // Throw the error to ensure a value is returned
      }
    });
}

export async function signInUser(
  usernameOrEmail: string,
  password: string
): Promise<IPostUser> {
  return axios
    .post("/auth/signin", {
      usernameOrEmail,
      password,
    })
    .then((userResponse) => userResponse.data)
    .catch((error) => {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error("Signin error: ", error.response.data);
        throw error.response.data; // Throw the error to ensure a value is returned
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.error("Signin error: ", error.request);
        throw error.request; // Throw the error to ensure a value is returned
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error: ", error.message);
        throw error.message; // Throw the error to ensure a value is returned
      }
    });
}
