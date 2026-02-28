import { Types } from "mongoose";
import { BOOKING_STATUS_ARRAY } from "./booking.constant";

export type BookingStatus = (typeof BOOKING_STATUS_ARRAY)[number];

export interface IBooking {
  userId: Types.ObjectId;
  bookingStatus: BookingStatus;

  address?: {
    address1?: string;
    address2?: string;
    city?: string;
    postcode?: string;
  };

  service: {
    serviceId: string;
    serviceName: string;
  };

  productOption?: {
    addOns?: string;
    duration?: number;
    totalPrice?: number;
    extraHours?: number;
  };

  timeSlots: {
    selectedDate: Date;
    selectedSlots: number;
  };
}
