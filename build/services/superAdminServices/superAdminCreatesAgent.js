"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAgent = void 0;
const uuid_1 = require("uuid");
const helpers_1 = require("../../helperFunctions/helpers");
const validations_1 = require("../../validators/validations");
const agentEntity_1 = __importDefault(require("../../entities/agentEntity"));
const locations_interface_1 = require("../../interfaces/locations.interface");
const notification_1 = require("../../utilities/notification");
const createAgent = async (request, response) => {
    try {
        const { first_name, last_name, email, phone, location, } = request.body;
        const validateInput = await validations_1.registerAgentSchema.validateAsync(request.body);
        if (validateInput.error) {
            return response.status(400).json({
                Error: validateInput.error.details[0].message,
            });
        }
        const validateEmail = await agentEntity_1.default.findOne({ where: { email } });
        if (validateEmail) {
            return response.status(400).json({
                status: `error`,
                message: `${email} already in use`,
            });
        }
        const locationKey = location.toUpperCase();
        const code_location = locations_interface_1.Locations[locationKey];
        if (!code_location) {
            return response.status(400).json({
                status: `error`,
                message: `This location does not exist among Max coverage areas`
            });
        }
        const newPassword = (0, helpers_1.generatePassword)(last_name.toLowerCase());
        const hashedPassword = await (0, helpers_1.hashPassword)(newPassword);
        const allagents = await agentEntity_1.default.findAll({ where: { location: code_location } });
        let lastAgentCode = '';
        let newAgentCode = '';
        if (allagents.length === 0) {
            newAgentCode = (0, helpers_1.generateAgentCode)(location, lastAgentCode);
        }
        else {
            let agentsCodes = allagents.map((a) => {
                const max_id_number = a.agent_max_id.split('-')[3];
                return Number(max_id_number);
            });
            let sortedAgentsCodes = agentsCodes.sort((agent1, agent2) => agent2 - agent1);
            lastAgentCode = sortedAgentsCodes[0].toString();
            newAgentCode = (0, helpers_1.generateAgentCode)(location, lastAgentCode);
        }
        const newAgent = await agentEntity_1.default.create({
            id: (0, uuid_1.v4)(),
            first_name,
            last_name,
            email,
            phone,
            password: hashedPassword,
            location: code_location,
            agent_max_id: newAgentCode,
            on_of_prospects: 0
        });
        const newAgentInstance = await agentEntity_1.default.findOne({ where: { id: newAgent.id } });
        if (!newAgentInstance) {
            return response.status(400).json({
                status: "error",
                message: "Something went wrong, try again"
            });
        }
        await (0, notification_1.sendPasswordMail)(email, newPassword);
        response.status(201).json({
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
