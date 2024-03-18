export interface vansInterface {
  id: string;
  name: string;
  description: string;
  price: number;
  type: string;
  imageUrl: string;
  hostID: string;
  buttonStyle: string;
}

export interface vansDetailsInterface extends vansInterface {
  typeBg: string;
}
