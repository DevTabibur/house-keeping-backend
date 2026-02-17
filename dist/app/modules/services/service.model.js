"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const service_constant_1 = require("./service.constant");
const serviceSchema = new mongoose_1.Schema({
    img: {
        type: String,
    },
    name: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true,
    },
    description: {
        type: String,
    },
    pricePerHour: {
        type: Number,
        required: true,
    },
    priceWithProducts: {
        type: Number,
        required: true,
    },
    priceWithoutProducts: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: service_constant_1.SERVICE_STATUS_ARRAY,
        default: service_constant_1.SERVICE_STATUS.ACTIVE,
    },
}, { timestamps: true });
const ServiceModel = (0, mongoose_1.model)("Service", serviceSchema);
exports.default = ServiceModel;
