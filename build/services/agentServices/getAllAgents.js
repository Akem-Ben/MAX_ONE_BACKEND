"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllAgents = void 0;
const agentEntity_1 = __importDefault(require("../../entities/agentEntity"));
const getAllAgents = async (request, response) => {
    try {
        const allagents = await agentEntity_1.default.findAll({});
        if (!allagents) {
            return response.status(404).json({
                status: `error`,
                message: `Unable to get all agents`
            });
        }
        if (allagents.length === 0) {
            return response.status(200).json({
                status: `success`,
                message: `No agents found`,
                allagents
            });
        }
        return response.status(201).json({
            status: `success`,
            message: `All agents fetched`,
            allagents
        });
    }
    catch (error) {
        return response.status(500).json({
            status: `error`,
            message: `Internal Server Error`,
            error: error.message
        });
    }
};
exports.getAllAgents = getAllAgents;
