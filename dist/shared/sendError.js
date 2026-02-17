"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendErrorResponse = void 0;
const http_status_1 = __importDefault(require("http-status"));
const zod_1 = require("zod");
const sendErrorResponse = (res, error) => {
    // Zod Error
    if (error instanceof zod_1.ZodError) {
        return res.status(http_status_1.default.BAD_REQUEST).json({
            success: false,
            message: "Validation Error",
            errors: error.errors.map((err) => ({
                field: err.path.join("."),
                message: err.message,
            })),
        });
    }
    // Custom Error
    return res.status(error.statusCode || http_status_1.default.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error.message,
        errors: error.errors || [],
    });
};
exports.sendErrorResponse = sendErrorResponse;
