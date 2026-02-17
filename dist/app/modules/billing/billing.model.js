"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BillingModel = void 0;
const mongoose_1 = require("mongoose");
const billingSchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
    booking: { type: mongoose_1.Schema.Types.ObjectId, ref: "Booking", required: true },
    amount: { type: Number, required: true },
    status: { type: String, enum: ["paid", "unpaid"], default: "unpaid" },
    paidAt: Date,
}, { timestamps: true });
exports.BillingModel = (0, mongoose_1.model)("Billing", billingSchema);
