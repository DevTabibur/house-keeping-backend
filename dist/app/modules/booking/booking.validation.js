"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBookingZodSchema = void 0;
const zod_1 = require("zod");
const mongoose_1 = __importDefault(require("mongoose"));
exports.createBookingZodSchema = zod_1.z.object({
    service: zod_1.z
        .string({
        required_error: "Service is required",
        invalid_type_error: "Service must be a string",
    })
        .min(1, "Service cannot be empty"),
    serviceId: zod_1.z
        .string({
        required_error: "Service ID is required",
        invalid_type_error: "Service ID must be a string",
    })
        .refine((val) => mongoose_1.default.Types.ObjectId.isValid(val), {
        message: "Invalid Service ID",
    })
        .transform((val) => new mongoose_1.default.Types.ObjectId(val)),
    productOption: zod_1.z
        .string({
        required_error: "Product option is required",
        invalid_type_error: "Product option must be a string",
    })
        .min(1, "Product option cannot be empty"),
    durationHours: zod_1.z
        .number({
        required_error: "Duration hours is required",
        invalid_type_error: "Duration hours must be a number",
    })
        .min(1, "Duration must be at least 1 hour"),
    addOns: zod_1.z.object({
        fridge: zod_1.z
            .boolean({
            invalid_type_error: "Fridge must be true or false",
        })
            .default(false), // ✅ default false
        oven: zod_1.z
            .boolean({
            invalid_type_error: "Oven must be true or false",
        })
            .default(false),
        windows: zod_1.z
            .boolean({
            invalid_type_error: "Windows must be true or false",
        })
            .default(false),
        balcony: zod_1.z
            .boolean({
            invalid_type_error: "Balcony must be true or false",
        })
            .default(false),
    }),
    extraHours: zod_1.z
        .number({
        required_error: "Extra hours is required",
        invalid_type_error: "Extra hours must be a number",
    })
        .min(0, "Extra hours cannot be negative"),
    address: zod_1.z.object({
        city: zod_1.z
            .string({ required_error: "City is required" })
            .min(1, "City cannot be empty"),
        line1: zod_1.z
            .string({ required_error: "Address line1 is required" })
            .min(1, "Address line1 cannot be empty"),
        line2: zod_1.z.string().optional(),
        postcode: zod_1.z
            .string({ required_error: "Postcode is required" })
            .min(1, "Postcode cannot be empty"),
    }),
    preferredDate: zod_1.z.preprocess((arg) => typeof arg === "string" || arg instanceof Date ? new Date(arg) : arg, zod_1.z.date({
        required_error: "Preferred date is required",
        invalid_type_error: "Preferred date must be a valid date",
    })),
    preferredTimeSlots: zod_1.z
        .array(zod_1.z.string({
        required_error: "Time slot is required",
        invalid_type_error: "Time slot must be a string",
    }))
        .min(1, "At least one time slot is required"),
});
