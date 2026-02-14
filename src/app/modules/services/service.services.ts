import { ServiceModel } from "./service.model";
import { ServiceInterface } from "./service.validation";

const createService = async (
  serviceData: ServiceInterface,
  userId: string,
): Promise<ServiceInterface> => {
  const { title, image, description, checklist } = serviceData;

  const service = await ServiceModel.create({
    title,
    image,
    description,
    checklist,
    userId,
  });

  return service;
};

export const Services = { createService };
