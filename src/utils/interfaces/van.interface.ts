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

export interface IVan {
  id: string;
  name: string;
  description: string;
  price: number;
  type: string;
  imageUrl: string;
  hostId: string;
  buttonStyle: string;
  typeBg?: string;
  createdAt: string;
}

export interface IGetVans {
  success: boolean;
  status: number;
  message: string;
  data: IVan[];
  timestamp: string;
}

export interface IGetVanDetail {
  success: boolean;
  status: number;
  message: string;
  data: IVan;
  timestamp: string;
  typeBg: string;
}
