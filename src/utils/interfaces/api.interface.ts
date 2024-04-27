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
  data: {
    email: string;
    accessToken: string;
    exp: string;
  };
  timestamp: string;
}

export interface IPostEmailAndOtp {
  success: boolean;
  status: number;
  message: string;
  data: {
    userId: string;
    email: string;
    username: string;
    accessToken: string;
    exp: string;
  };
  timestamp: string;
}
