import { Types } from "mongoose";

export type BookingStatus = "pending" | "confirmed" | "completed" | "canceled";

export interface IBooking {
  user: Types.ObjectId;
  service: string;
  serviceId: Types.ObjectId;
  productOption: string;
  durationHours: number;
  addOns: {
    fridge: boolean;
    oven: boolean;
    windows: boolean;
    balcony: boolean;
  };
  extraHours: number;
  address: {
    city: string;
    line1: string;
    line2?: string;
    postcode: string;
  };
  preferredDate: Date;
  preferredTimeSlots: string[];
  status: BookingStatus;
}
