import { Schema, model } from "mongoose";
import { IBilling } from "./billing.interface";

const billingSchema = new Schema<IBilling>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    booking: { type: Schema.Types.ObjectId, ref: "Booking", required: true },
    amount: { type: Number, required: true },
    status: { type: String, enum: ["paid", "unpaid"], default: "unpaid" },
    paidAt: Date,
  },
  { timestamps: true },
);

export const BillingModel = model<IBilling>("Billing", billingSchema);
