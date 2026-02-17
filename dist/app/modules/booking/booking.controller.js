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
const http_status_1 = __importDefault(require("http-status"));
const booking_service_1 = require("./booking.service");
const sendSuccessResponse_1 = require("../../../shared/sendSuccessResponse");
const createBooking = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield booking_service_1.BookingService.createBooking(req.body);
    (0, sendSuccessResponse_1.sendSuccessResponse)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        data: result,
        message: "Booking created successfully",
    });
});
const getMyBookings = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield booking_service_1.BookingService.getMyBookings(req.user.id);
    res.status(http_status_1.default.OK).json({
        success: true,
        data: result,
    });
});
const cancelBooking = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield booking_service_1.BookingService.cancelBooking(req.params.id);
    res.status(http_status_1.default.OK).json({
        success: true,
        message: "Booking canceled",
        data: result,
    });
});
exports.BookingController = {
    createBooking,
    getMyBookings,
    cancelBooking,
};
