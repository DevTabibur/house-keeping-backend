import mongoose, { Schema } from "mongoose";
import { BookingInterface } from "./booking.validation";

const BookingSchema = new Schema<BookingInterface>(
  {
    service: {
      type: String,
      default: null,
    },

    serviceId: {
      type: Schema.Types.ObjectId,
      ref: "Service",
      required: true,
    },

    productOption: {
      type: String,
      default: null,
    },

    durationHours: {
      type: Number,
      default: 3,
      required: true,
    },

    addOns: {
      fridge: {
        type: Boolean,
        default: false,
      },
      oven: {
        type: Boolean,
        default: false,
      },
      windows: {
        type: Boolean,
        default: false,
      },
      balcony: {
        type: Boolean,
        default: false,
      },
    },

    extraHours: {
      type: Number,
      default: 0,
    },

    address: {
      city: {
        type: String,
        required: true,
      },
      line1: {
        type: String,
        required: true,
      },
      line2: {
        type: String,
        default: "",
      },
      postcode: {
        type: String,
        required: true,
      },
    },

    preferredDate: {
      type: Date,
      required: true,
    },

    preferredTimeSlots: {
      type: [String],
      default: [],
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const BookingModel =
  mongoose.models.Booking ||
  mongoose.model<BookingInterface>("Booking", BookingSchema);
