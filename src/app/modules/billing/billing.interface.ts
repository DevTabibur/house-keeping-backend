import { Types } from "mongoose";

export interface IBilling {
  user: Types.ObjectId;
  booking: Types.ObjectId;
  amount: number;
  status: "paid" | "unpaid";
  paidAt?: Date;
}
