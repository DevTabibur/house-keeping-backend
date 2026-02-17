import { Types } from "mongoose";

export type BookingStatus = "pending" | "confirmed" | "completed" | "canceled";

export interface IBooking {
  user: Types.ObjectId;
  serviceName: string;
  date: Date;
  startTime: string;
  endTime: string;
  hours: number;
  address: string;
  city: string;
  status: BookingStatus;
  price: number;
}
