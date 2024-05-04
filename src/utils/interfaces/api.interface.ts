export interface IResponse {
  success: boolean;
  status: number;
  message: string;
  timestamp: string;
}

export interface IPostImage extends IResponse {
  data: {
    imageUrl: string;
  };
}

export interface IPostUser extends IResponse {
  data: {
    userId: string;
    email: string;
    accessToken: string;
    exp: string;
  };
}

export interface IPostEmailAndOtp extends IResponse {
  data: {
    userId: string;
    email: string;
    username: string;
    accessToken: string;
    exp: string;
  };
}
