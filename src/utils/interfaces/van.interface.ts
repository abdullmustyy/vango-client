import { IResponse } from "./api.interface";

export interface vansInterface {
  id: string;
  name: string;
  description: string;
  price: number;
  type: string;
  imageUrl: string;
  hostId: string;
  buttonStyle: string;
}

export interface vansDetailsInterface extends vansInterface {
  typeBg: string;
}

export interface IVan {
  vanId: string;
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

export interface IGetVans extends IResponse {
  data: IVan[];
}

export interface IGetVanDetail extends IResponse {
  data: IVan;
  typeBg: string;
}

export interface IPostVan extends IResponse {
  data: IVan;
}

export interface ICreateVanValues {
  name: string;
  description: string;
  price: number;
  type: string;
}

export type TCreateVan = Omit<vansInterface, "id" | "buttonStyle">;
