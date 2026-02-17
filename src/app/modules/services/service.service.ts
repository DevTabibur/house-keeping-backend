import { IService } from "./service.interface";
import { ServiceModel } from "./service.model";

const createService = async (payload: IService) => {
  const result = await ServiceModel.create(payload);
  console.log("result", result);
  return result;
};

const getAllServices = async () => {
  return await ServiceModel.find({ isActive: true }).sort({ createdAt: -1 });
};

const updateService = async (id: string, payload: Partial<IService>) => {
  return await ServiceModel.findByIdAndUpdate(id, payload, { new: true });
};

const deleteService = async (id: string) => {
  return await ServiceModel.findByIdAndUpdate(
    id,
    { isActive: false },
    { new: true },
  );
};

export const ServiceService = {
  createService,
  getAllServices,
  updateService,
  deleteService,
};
