"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceRoute = void 0;
const express_1 = require("express");
const authGuard_1 = __importDefault(require("../../middlewares/authGuard"));
const user_constant_1 = require("../user/user.constant");
const servcie_controller_1 = require("./servcie.controller");
const router = (0, express_1.Router)();
// create services Admin only
router.post("/", (0, authGuard_1.default)(user_constant_1.USER_ROLE_ENUM.ADMIN), servcie_controller_1.ServiceController.createService);
router.patch("/:id", (0, authGuard_1.default)(user_constant_1.USER_ROLE_ENUM.ADMIN), servcie_controller_1.ServiceController.updateService);
router.delete("/:id", (0, authGuard_1.default)(user_constant_1.USER_ROLE_ENUM.ADMIN), servcie_controller_1.ServiceController.deleteService);
// Public / user
router.get("/", servcie_controller_1.ServiceController.getAllServices);
exports.ServiceRoute = router;
