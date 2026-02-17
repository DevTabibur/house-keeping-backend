"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingController = void 0;
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const booking_service_1 = require("./booking.service");
const sendSuccessResponse_1 = require("../../../shared/sendSuccessResponse");
const http_status_1 = __importDefault(require("http-status"));
const booking_validation_1 = require("./booking.validation");
const sendError_1 = require("../../../shared/sendError");
const createBookingController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    // ✅ Validate data with Zod schema
    const result = booking_validation_1.createBookingZodSchema.safeParse(req.body);
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
    if (!userId) {
        return (0, sendError_1.sendErrorResponse)(res, {
            statusCode: http_status_1.default.UNAUTHORIZED,
            message: "Unauthorized",
        });
    }
    if (!result.success) {
        return (0, sendError_1.sendErrorResponse)(res, result.error);
    }
    // ✅ Data is valid
    const booking = yield booking_service_1.BookingService.createBooking(result.data);
    (0, sendSuccessResponse_1.sendSuccessResponse)(res, {
        statusCode: http_status_1.default.OK,
        message: "Booking created successfully",
        data: booking,
    });
}));
exports.BookingController = { createBookingController };
