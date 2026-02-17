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
exports.ServiceController = void 0;
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const service_services_1 = require("./service.services");
const http_status_1 = __importDefault(require("http-status"));
const sendError_1 = require("../../../shared/sendError");
const service_validation_1 = require("./service.validation");
const sendSuccessResponse_1 = require("../../../shared/sendSuccessResponse");
const createServiceController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    // parse the request body
    const result = service_validation_1.createServiceZodSchema.safeParse(req.body);
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
    if (!userId) {
        return (0, sendError_1.sendErrorResponse)(res, {
            statusCode: http_status_1.default.UNAUTHORIZED,
            message: "Unauthorized user",
        });
    }
    if (!result.success) {
        return (0, sendError_1.sendErrorResponse)(res, result.error);
    }
    const service = yield service_services_1.Services.createService(result.data, userId);
    (0, sendSuccessResponse_1.sendSuccessResponse)(res, {
        statusCode: http_status_1.default.OK,
        message: "Service created successfully",
        data: service,
    });
}));
exports.ServiceController = { createServiceController };
