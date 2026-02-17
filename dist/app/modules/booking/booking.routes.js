"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingRoute = void 0;
const express_1 = require("express");
const authGuard_1 = __importDefault(require("../../middlewares/authGuard"));
const user_constant_1 = require("../user/user.constant");
const booking_controller_1 = require("./booking.controller");
const router = (0, express_1.Router)();
router.post("/", (0, authGuard_1.default)(user_constant_1.USER_ROLE_ENUM.USER), booking_controller_1.BookingController.createBooking);
router.get("/my", (0, authGuard_1.default)(user_constant_1.USER_ROLE_ENUM.USER), booking_controller_1.BookingController.getMyBookings);
router.patch("/:id/cancel", (0, authGuard_1.default)(user_constant_1.USER_ROLE_ENUM.USER), booking_controller_1.BookingController.cancelBooking);
exports.BookingRoute = router;
