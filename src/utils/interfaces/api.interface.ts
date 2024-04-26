export interface IPostImage {
  success: boolean;
  status: number;
  message: string;
  data: {
    imageUrl: string;
  };
  timestamp: string;
}

export interface IPostUser {
  success: boolean;
  status: number;
  message: string;
  data: { email: string };
  timestamp: string;
}

export interface IVerifyEmailAndOtp {
  success: boolean;
  status: number;
  message: string;
  data: {
    userId: string;
    email: string;
    username: string;
    accessToken: string;
  };
  timestamp: string;
}
