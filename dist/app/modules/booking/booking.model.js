"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingModel = void 0;
const mongoose_1 = require("mongoose");
const bookingSchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
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
}, { timestamps: true });
exports.BookingModel = (0, mongoose_1.model)("Booking", bookingSchema);
