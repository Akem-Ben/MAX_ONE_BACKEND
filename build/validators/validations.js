"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerAgentSchema = exports.loginSchema = exports.registerAdminSchema = void 0;
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
    location: joi_1.default.string().required()
});
// export const validateCreateTarget = Joi.object({
//     name: Joi.string().required()
//     .messages({
//       'any.required': 'Please provide your name.'
//     }),
//     target: Joi.string().required()
//     .messages({
//       'any.required': 'Please provide target name.'
//     }),
//     target_amount: Joi.number().required()
//     .messages({
//       'any.required': 'Target amount is required'
//     }),
//     category: Joi.string().required().valid('Travel', 'Dream_Home', 'Dream_Car', 'Other', 'Rent','Gadgets')
//     .messages({
//       'any.required': 'Category of saving is not yet filled. Please input.'
//     }),
//     frequency: Joi.string().required().valid('Daily', 'Weekly', 'Monthly', 'Annually')
//     .messages({
//       'any.required': 'Frequency of saving is not yet filled. Please input.'
//     }),
//     startDate: Joi.string().required()
//     .messages({
//       'any.required': 'Input start date'
//     }),
//     endDate: Joi.string().required()
//     .messages({
//       'any.required': 'Input end date'
//     }),
//   });
