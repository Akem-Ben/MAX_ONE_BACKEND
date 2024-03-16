"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reassignAProspectToAnAgent = void 0;
const usersEntity_1 = __importDefault(require("../../entities/usersEntity"));
const agentEntity_1 = __importDefault(require("../../entities/agentEntity"));
const reassignAProspectToAnAgent = async (request, response) => {
    try {
        const { userId } = request.params;
        if (request.query.agent_id) {
            const agentId = request.query.agent_id;
            const user = await usersEntity_1.default.findOne({ where: { id: userId } });
            if (!user) {
                return response.status(404).json({
                    status: `error`,
                    message: `User not found`
                });
            }
            await usersEntity_1.default.update({ agent_id: agentId }, { where: { id: userId } });
            const oldAgent = await agentEntity_1.default.findOne({ where: { id: user.agent_id } });
            const newNoOfProspectOldAgent = oldAgent.no_of_prospects - 1;
            await agentEntity_1.default.update({ no_of_prospects: newNoOfProspectOldAgent }, { where: { id: agentId } });
            const newAgent = await agentEntity_1.default.findOne({ where: { id: agentId } });
            const newNoOfProspectNewAgent = newAgent.no_of_prospects + 1;
            await agentEntity_1.default.update({ no_of_prospects: newNoOfProspectNewAgent }, { where: { id: agentId } });
            return response.status(201).json({
                status: `success`,
                message: `User reassigned to ${newAgent.first_name} ${newAgent.last_name}`,
                user
            });
        }
        const user = await usersEntity_1.default.findOne({ where: { id: userId } });
        const searchLocation = user.location;
        const agentWithLowestProspects = await agentEntity_1.default.findOne({
            where: { location: searchLocation },
            order: [['no_of_prospects', 'ASC']]
        });
        let new_agent_id = agentWithLowestProspects.id;
        let new_no_of_prospect = agentWithLowestProspects.no_of_prospects + 1;
        await agentEntity_1.default.update({ no_of_prospects: new_no_of_prospect }, { where: { id: agentWithLowestProspects.id } });
        await usersEntity_1.default.update({ agent_id: new_agent_id }, { where: { id: userId } });
        return response.status(201).json({
            status: `success`,
            message: `User reassigned to ${agentWithLowestProspects.first_name} ${agentWithLowestProspects.last_name}`,
            user
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
exports.reassignAProspectToAnAgent = reassignAProspectToAnAgent;
