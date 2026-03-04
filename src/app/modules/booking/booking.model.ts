import mongoose, { model, models, Schema } from "mongoose";
import { IBooking } from "./booking.interface";
import { BOOKING_STATUS, BOOKING_STATUS_ARRAY } from "./booking.constant";

const BookingSchema = new Schema<IBooking>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    bookingStatus: {
      type: String,
      enum: BOOKING_STATUS_ARRAY,
      default: BOOKING_STATUS.PENDING,
      required: true,
    },

    address: {
      address1: { type: String },
      address2: { type: String },
      city: { type: String },
      postcode: { type: String },
    },

    service: {
      serviceId: {
        type: String,
        required: true,
      },
      serviceName: {
        type: String,
        required: true,
      },
    },

    productOption: {
      addOns: { type: [String], default: [] },
      duration: { type: Number },
      totalPrice: { type: Number },
      extraHours: { type: Number },
    },

    timeSlots: {
      selectedDate: {
        type: Date,
        // required: true,
      },
      selectedSlots: {
        type: [String],
        default: [],
        // required: true,
      },
    },
    isConfirm: {
      type: Boolean,
      default: true,
    },
    isCancel: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

const BookingModel = model<IBooking>("Booking", BookingSchema);

export default BookingModel;
