import { SERVICE_STATUS } from "./service.constant";

export type IService = {
  img?: string;
  name: string;
  description: string;
  pricePerHour: number;
  priceWithProducts: number;
  priceWithoutProducts: number;
  status: SERVICE_STATUS;
};
