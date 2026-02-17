"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceRoutes = void 0;
const express_1 = require("express");
const service_controller_1 = require("./service.controller");
const authGuard_1 = __importDefault(require("../../middlewares/authGuard"));
const router = (0, express_1.Router)();
router.post("/create", (0, authGuard_1.default)(), service_controller_1.ServiceController.createServiceController);
exports.ServiceRoutes = router;
