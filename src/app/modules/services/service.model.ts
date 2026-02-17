import mongoose, { model, Schema } from "mongoose";
import { ServiceInterface } from "./service.validation";

const ServiceSchema = new Schema<ServiceInterface>(
  {
    category: {
      type: String,
      required: [true, "Category is required"],
      trim: true,
      minlength: 3,
      maxlength: 100,
      index: true,
    },

    title: {
      type: String,
      required: [true, "Service title is required"],
      trim: true,
      minlength: 3,
      maxlength: 200,
      index: true,
    },

    image: {
      type: String,
      required: [true, "Image is required"],
      trim: true,
    },

    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
      minlength: 10,
      maxlength: 5000,
    },

    checklist: {
      type: [String],
      required: [true, "Checklist is required"],
    },
  },
  {
    timestamps: true,
  },
);

export const ServiceModel =
  mongoose.models.Service || model<ServiceInterface>("Service", ServiceSchema);
