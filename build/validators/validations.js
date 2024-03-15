"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateCreateTarget = exports.registerAgentSchema = exports.loginSchema = exports.registerAdminSchema = void 0;
const tslib_1 = require("tslib");
const joi_1 = tslib_1.__importDefault(require("joi"));
exports.registerAdminSchema = joi_1.default.object({
    first_name: joi_1.default.string().required(),
    last_name: joi_1.default.string().required(),
    email: joi_1.default.string().email({ minDomainSegments: 2 }),
    phone: joi_1.default.string().required(),
    password: joi_1.default.string().required(),
    confirm_password: joi_1.default.string().required(),
});
exports.loginSchema = joi_1.default.object({
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().required(),
});
exports.registerAgentSchema = joi_1.default.object({
    first_name: joi_1.default.string().required(),
    last_name: joi_1.default.string().required(),
    email: joi_1.default.string().email({ minDomainSegments: 2 }),
    phone: joi_1.default.string().required(),
    location: joi_1.default.string().required()
});
exports.validateCreateTarget = joi_1.default.object({
    name: joi_1.default.string().required()
        .messages({
        'any.required': 'Please provide your name.'
    }),
    target: joi_1.default.string().required()
        .messages({
        'any.required': 'Please provide target name.'
    }),
    target_amount: joi_1.default.number().required()
        .messages({
        'any.required': 'Target amount is required'
    }),
    category: joi_1.default.string().required().valid('Travel', 'Dream_Home', 'Dream_Car', 'Other', 'Rent', 'Gadgets')
        .messages({
        'any.required': 'Category of saving is not yet filled. Please input.'
    }),
    frequency: joi_1.default.string().required().valid('Daily', 'Weekly', 'Monthly', 'Annually')
        .messages({
        'any.required': 'Frequency of saving is not yet filled. Please input.'
    }),
    startDate: joi_1.default.string().required()
        .messages({
        'any.required': 'Input start date'
    }),
    endDate: joi_1.default.string().required()
        .messages({
        'any.required': 'Input end date'
    }),
});
//# sourceMappingURL=validations.js.map