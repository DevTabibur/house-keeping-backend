"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingRoute = void 0;
const express_1 = require("express");
const booking_controller_1 = require("./booking.controller");
const authGuard_1 = __importDefault(require("../../middlewares/authGuard"));
const user_constant_1 = require("../user/user.constant");
const router = (0, express_1.Router)();
router.post("/create", (0, authGuard_1.default)(user_constant_1.USER_ROLE_ENUM.ADMIN, user_constant_1.USER_ROLE_ENUM.GUEST, user_constant_1.USER_ROLE_ENUM.EDITOR), booking_controller_1.BookingController.createBookingController);
exports.BookingRoute = router;
