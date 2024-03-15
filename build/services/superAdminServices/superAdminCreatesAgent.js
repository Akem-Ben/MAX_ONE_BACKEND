"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAgent = void 0;
const tslib_1 = require("tslib");
const uuid_1 = require("uuid");
const helpers_1 = require("../../helperFunctions/helpers");
const validations_1 = require("../../validators/validations");
const agentEntity_1 = tslib_1.__importDefault(require("../../entities/agentEntity"));
const createAgent = async (request, response) => {
    try {
        const { first_name, last_name, email, phone, location, } = request.body;
        const validateInput = await validations_1.registerAgentSchema.validateAsync(request.body);
        if (validateInput.error) {
            console.log("error", validateInput);
            return response.status(400).json({
                Error: validateInput.error.details[0].message,
            });
        }
        const newPassword = (0, helpers_1.generateAgentPassword)(last_name.toLowerCase());
        const hashedPassword = await (0, helpers_1.hashPassword)(newPassword);
        const allagents = await agentEntity_1.default.findAll({ where: { location } });
        let lastAgentCode = '';
        let newAgentCode = '';
        if (allagents.length === 0) {
            newAgentCode = (0, helpers_1.generateAgentCode)(location, lastAgentCode);
        }
        else {
            let sortedAgents = allagents.sort((a, b) => Number(b.code.slice(-4)) - Number(a.code.slice(-4)));
            lastAgentCode = sortedAgents[0].toString();
            newAgentCode = (0, helpers_1.generateAgentCode)(location, lastAgentCode);
        }
        const newAgent = await agentEntity_1.default.create({
            id: (0, uuid_1.v4)(),
            first_name,
            last_name,
            email,
            phone,
            password: hashedPassword,
            location,
            code: newAgentCode
        });
        const newAgentInstance = await agentEntity_1.default.findOne({ where: { id: newAgent.id } });
        if (!newAgentInstance) {
            return response.status(400).json({
                status: "error",
                message: "Something went wrong, try again"
            });
        }
        response.status(200).json({
            status: "success",
            message: "Agent created successfully",
            newAgentInstance
        });
    }
    catch (error) {
        return response.status(500).json({
            status: "error",
            message: `Internal Server Error: ${error}`
        });
    }
};
exports.createAgent = createAgent;
//# sourceMappingURL=superAdminCreatesAgent.js.map