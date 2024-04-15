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
  data: object;
  timestamp: string;
}
