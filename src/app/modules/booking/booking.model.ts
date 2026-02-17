import { Schema, model } from "mongoose";
import { IBooking } from "./booking.interface";

const bookingSchema = new Schema<IBooking>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    serviceName: { type: String, required: true },
    date: { type: Date, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    hours: { type: Number, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    status: {
      type: String,
      enum: ["pending", "confirmed", "completed", "canceled"],
      default: "pending",
    },
    price: { type: Number, required: true },
  },
  { timestamps: true },
);

export const BookingModel = model<IBooking>("Booking", bookingSchema);
