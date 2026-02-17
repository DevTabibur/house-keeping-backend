import { Schema, model } from "mongoose";
import { IService } from "./service.interface";
import { SERVICE_STATUS, SERVICE_STATUS_ARRAY } from "./service.constant";

const serviceSchema = new Schema<IService>(
  {
    img: {
      type: String,
    },
    name: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
    },
    description: {
      type: String,
    },
    pricePerHour: {
      type: Number,
      required: true,
    },
    priceWithProducts: {
      type: Number,
      required: true,
    },
    priceWithoutProducts: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: SERVICE_STATUS_ARRAY,
      default: SERVICE_STATUS.ACTIVE,
    },
  },
  { timestamps: true },
);

const ServiceModel = model<IService>("Service", serviceSchema);
export default ServiceModel;
