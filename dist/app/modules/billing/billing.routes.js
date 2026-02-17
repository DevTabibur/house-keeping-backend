"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BillingRoute = void 0;
const billing_controller_1 = require("./billing.controller");
const express_1 = require("express");
const authGuard_1 = __importDefault(require("../../middlewares/authGuard"));
const user_constant_1 = require("../user/user.constant");
const router = (0, express_1.Router)();
router.get("/my", (0, authGuard_1.default)(user_constant_1.USER_ROLE_ENUM.USER), billing_controller_1.BillingController.getMyBillings);
exports.BillingRoute = router;
