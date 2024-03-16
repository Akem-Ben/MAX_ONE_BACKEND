"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUserSchema = exports.registerAgentSchema = exports.loginSchema = exports.registerAdminSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.registerAdminSchema = joi_1.default.object({
    first_name: joi_1.default.string().required(),
    last_name: joi_1.default.string().required(),
    email: joi_1.default.string().email({ minDomainSegments: 2 }),
    phone: joi_1.default.string().required().min(11),
    password: joi_1.default.string().required().min(6),
    confirm_password: joi_1.default.string().required().min(6),
});
exports.loginSchema = joi_1.default.object({
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().required(),
});
exports.registerAgentSchema = joi_1.default.object({
    first_name: joi_1.default.string().required(),
    last_name: joi_1.default.string().required(),
    email: joi_1.default.string().email({ minDomainSegments: 2 }),
    phone: joi_1.default.string().required().min(11),
    location: joi_1.default.string().required(),
});
exports.registerUserSchema = joi_1.default.object({
    first_name: joi_1.default.string().required(),
    last_name: joi_1.default.string().required(),
    email: joi_1.default.string().email({ minDomainSegments: 2 }),
    phone: joi_1.default.string().required().min(11),
    location: joi_1.default.string().required(),
    interest: joi_1.default.number().required(),
    sub_channel: joi_1.default.number().required(),
    channel: joi_1.default.number().required(),
    stage: joi_1.default.number().required(),
});
