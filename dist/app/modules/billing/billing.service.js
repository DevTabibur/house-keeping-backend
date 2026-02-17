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
Object.defineProperty(exports, "__esModule", { value: true });
exports.BillingService = void 0;
const billing_model_1 = require("./billing.model");
const getMyBillings = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield billing_model_1.BillingModel.find({ user: userId })
        .populate("booking")
        .sort({ createdAt: -1 });
});
exports.BillingService = {
    getMyBillings,
};
