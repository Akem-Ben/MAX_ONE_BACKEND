"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginAgent = void 0;
const validations_1 = require("../../validators/validations");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const helpers_1 = require("../../helperFunctions/helpers");
const agentEntity_1 = __importDefault(require("../../entities/agentEntity"));
const loginAgent = async (request, response) => {
    try {
        const { email, password } = request.body;
        const validateInput = await validations_1.loginSchema.validateAsync(request.body);
        if (validateInput.error) {
            return response.status(400).json({
                Error: validateInput.error.details[0].message,
            });
        }
        const agent = (await agentEntity_1.default.findOne({
            where: { email: email },
        }));
        if (!agent) {
            return response.status(404).json({
                message: `agent does not exist`
            });
        }
        const validatePassword = await bcryptjs_1.default.compare(password, agent.password);
        if (!validatePassword) {
            return response.status(401).send({
                status: "error",
                message: "Password is Incorect",
            });
        }
        const tokenData = {
            id: agent.id,
            email: agent.email
        };
        const token = await (0, helpers_1.generateToken)(tokenData);
        return response.status(200).json({
            status: "success",
            message: "Login Successful",
            agent,
            token,
        });
    }
    catch (error) {
        return response.status(500).json({
            status: `error`,
            message: `Internal Server Error`
        });
    }
};
exports.loginAgent = loginAgent;
