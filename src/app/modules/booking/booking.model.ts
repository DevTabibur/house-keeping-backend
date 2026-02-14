import mongoose, { Schema } from "mongoose";
import { BookingInterface } from "./booking.types";

const BookingSchema = new Schema<BookingInterface>(
  {
    service: {
      type: String,
      default: null,
    },

    serviceId: {
      type: String,
      default: null,
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
      type: String,
      default: null,
    },

    preferredDate: {
      type: Date,
      default: null,
    },

    preferredTimeSlots: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  },
);

export const BookingModel =
  mongoose.models.Booking ||
  mongoose.model<BookingInterface>("Booking", BookingSchema);
