import { axios } from "./utils/configs/axios.config";
import {
  IPostEmailAndOtp,
  IPostImage,
  IPostUser,
} from "./utils/interfaces/api.interface";
import {
  IGetVans,
  IGetVanDetail,
  TCreateVan,
  IPostVan,
} from "./utils/interfaces/van.interface";

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
        console.error("Error while fetching vans: ", error.response.data);
        throw error.response.data;
      } else if (error.request) {
        console.error("Error while fetching vans: ", error.request);
        throw error.request;
      } else {
        console.error("Error: ", error.message);
        throw error.message;
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
        console.error("Error while fetching van detail: ", error.response.data);
        throw error.response.data;
      } else if (error.request) {
        console.error("Error while fetching van detail: ", error.request);
        throw error.request;
      } else {
        console.error("Error: ", error.message);
        throw error.message;
      }
    });
}

export async function getHostVans(userId: string) {
  return axios
    .get<IGetVans>(`/host/${userId}/vans`)
    .then((hostVansResponse) => hostVansResponse.data)
    .catch((error) => {
      if (error.response) {
        console.error("Error while fetching host vans: ", error.response.data);
        throw error.response.data;
      } else if (error.request) {
        console.error("Error while fetching host vans: ", error.request);
        throw error.request;
      } else {
        console.error("Error: ", error.message);
        throw error.message;
      }
    });
}

export async function getHostVanDetail(vanId: string, userId: string) {
  return axios
    .get<IGetVanDetail>(`/host/${userId}/vans/${vanId}`)
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
        console.error(
          "Error while fetching host van detail: ",
          error.response.data
        );
        throw error.response.data;
      } else if (error.request) {
        console.error("Error while fetching host van detail: ", error.request);
        throw error.request;
      } else {
        console.error("Error: ", error.message);
        throw error.message;
      }
    });
}

export async function createVan(van: TCreateVan) {
  return axios
    .post<IPostVan>("/vans", van)
    .then((vanResponse) => vanResponse.data)
    .catch((error) => {
      if (error.response) {
        console.error("Error while creating van: ", error.response.data);
        throw error.response.data;
      } else if (error.request) {
        console.error("Error while creating van: ", error.request);
        throw error.request;
      } else {
        console.error("Error: ", error.message);
        throw error.message;
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
        console.error("Image upload error: ", error.response.data);
        throw error.response.data;
      } else if (error.request) {
        console.error("Image upload error: ", error.request);
        throw error.request;
      } else {
        console.error("Error: ", error.message);
        throw error.message;
      }
    });
}

export async function uploadVanImage(image: File) {
  const form = new FormData();
  form.append("image", image);

  return axios
    .post<IPostImage>("/vans/image", form)
    .then((imageResponse) => imageResponse.data)
    .catch((error) => {
      if (error.response) {
        console.error("Image upload error: ", error.response.data);
        throw error.response.data;
      } else if (error.request) {
        console.error("Image upload error: ", error.request);
        throw error.request;
      } else {
        console.error("Error: ", error.message);
        throw error.message;
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
        console.error("Registration error: ", error.response.data);
        throw error.response.data;
      } else if (error.request) {
        console.error("Registration error: ", error.request);
        throw error.request;
      } else {
        console.error("Error: ", error.message);
        throw error.message;
      }
    });
}

export async function verifyEmailAndOtp(
  email: string,
  otp: string
): Promise<IPostEmailAndOtp> {
  return axios
    .post("/auth/otp/verify", {
      email,
      otp,
    })
    .then((otpResponse) => otpResponse.data)
    .catch((error) => {
      if (error.response) {
        console.error("Email & Otp verification error: ", error.response.data);
        throw error.response.data;
      } else if (error.request) {
        console.error("Email & Otp verification error: ", error.request);
        throw error.request;
      } else {
        console.error("Error: ", error.message);
        throw error.message;
      }
    });
}

export async function resendOtp(email: string): Promise<IPostEmailAndOtp> {
  return axios
    .post("/auth/otp/resend", {
      email,
    })
    .then((otpResponse) => otpResponse.data)
    .catch((error) => {
      if (error.response) {
        console.error("Otp resend error: ", error.response.data);
        throw error.response.data;
      } else if (error.request) {
        console.error("Otp resend error: ", error.request);
        throw error.request;
      } else {
        console.error("Error: ", error.message);
        throw error.message;
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
        console.error("Signin error: ", error.response.data);
        throw error.response.data;
      } else if (error.request) {
        console.error("Signin error: ", error.request);
        throw error.request;
      } else {
        console.error("Error: ", error.message);
        throw error.message;
      }
    });
}
