"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createServiceZodSchema = void 0;
const zod_1 = require("zod");
exports.createServiceZodSchema = zod_1.z.object({
    category: zod_1.z
        .string({
        required_error: "Category is required",
        invalid_type_error: "Category must be a string",
    })
        .trim()
        .min(3, "Category must be at least 3 characters")
        .max(100, "Category cannot exceed 100 characters"),
    title: zod_1.z
        .string({
        required_error: "Service title is required",
        invalid_type_error: "Service title must be a string",
    })
        .trim()
        .min(3, "Title must be at least 3 characters")
        .max(200, "Title cannot exceed 200 characters"),
    image: zod_1.z
        .string({
        required_error: "Image URL is required",
    })
        .url("Invalid image URL"),
    description: zod_1.z
        .string({
        required_error: "Description is required",
    })
        .trim()
        .min(10, "Description must be at least 10 characters")
        .max(5000, "Description too long"),
    checklist: zod_1.z
        .array(zod_1.z.string().trim().min(1, "Checklist item cannot be empty"))
        .min(1, "At least one checklist item is required"),
});
