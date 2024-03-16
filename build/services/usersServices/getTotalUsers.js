"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTotalUsersByStages = void 0;
const usersEntity_1 = __importDefault(require("../../entities/usersEntity"));
const helpers_1 = require("../../helperFunctions/helpers");
const getTotalUsersByStages = async (request, response) => {
    try {
        const query = await (0, helpers_1.queryFilter)(request.query || {});
        const finalOutput = {};
        const stages = [
            "TOP_OF_FUNNEL",
            "READY_FOR_CHECK_IN",
            "CHECKED_IN",
            "TESTED",
            "ISSUED_VERIFICATION_FORM",
            "IN_VERIFICATION",
            "ONBOARDING",
            "AWAITING_ACTIVATION"
        ];
        const users = await usersEntity_1.default.findAll({ where: query });
        stages.forEach((stage) => {
            const stageUsers = users.filter((user) => user.stage === stage);
            finalOutput[stage] = { users: stageUsers, count: stageUsers.length };
        });
        return response.status(200).json({
            status: "success",
            message: `Users fetched successfully by stages`,
            finalOutput
        });
    }
    catch (error) {
        console.log(error.message);
        return response.status(500).json({
            status: "error",
            message: `Internal Server Error: ${error}`
        });
    }
};
exports.getTotalUsersByStages = getTotalUsersByStages;
