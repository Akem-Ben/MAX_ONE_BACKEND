"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reassignAllProspectsOfAnAgent = void 0;
const usersEntity_1 = __importDefault(require("../../entities/usersEntity"));
const agentEntity_1 = __importDefault(require("../../entities/agentEntity"));
const reassignAllProspectsOfAnAgent = async (request, response) => {
    try {
        const { oldAgentId } = request.params;
        if (request.query.newAgentId) {
            const agentId = request.query.newAgentId;
            const oldUsers = await usersEntity_1.default.findAll({ where: { agent_id: oldAgentId } });
            (await usersEntity_1.default.update({ agent_id: agentId }, { where: { agent_id: oldAgentId } }));
            const oldAgent = (await agentEntity_1.default.findOne({
                where: { id: oldAgentId },
            }));
            const noOfProspectOldAgent = Number(oldAgent.no_of_prospects);
            await agentEntity_1.default.update({ no_of_prospects: 0 }, { where: { id: oldAgentId } });
            const newAgent = (await agentEntity_1.default.findOne({
                where: { id: agentId },
            }));
            const newNoOfProspectNewAgent = newAgent.no_of_prospects + noOfProspectOldAgent;
            await agentEntity_1.default.update({ no_of_prospects: newNoOfProspectNewAgent }, { where: { id: agentId } });
            const testUsers = await usersEntity_1.default.findAll({ where: { agent_id: agentId } });
            return response.status(201).json({
                status: `success`,
                message: `Users reassigned to ${newAgent.first_name} ${newAgent.last_name}`,
                oldUsers,
                testUsers
            });
        }
        const oldAgent = (await agentEntity_1.default.findOne({
            where: { id: oldAgentId },
        }));
        const noOfProspectOldAgent = Number(oldAgent.no_of_prospects);
        const searchLocation = oldAgent.location;
        const agentWithLowestProspects = (await agentEntity_1.default.findOne({
            where: { location: searchLocation },
            order: [["no_of_prospects", "ASC"]],
        }));
        let new_agent_id = agentWithLowestProspects.id;
        const oldUsers = await usersEntity_1.default.findAll({ where: { agent_id: oldAgentId } });
        (await usersEntity_1.default.update({ agent_id: new_agent_id }, { where: { agent_id: oldAgentId } }));
        let new_no_of_prospect = agentWithLowestProspects.no_of_prospects + noOfProspectOldAgent;
        await agentEntity_1.default.update({ no_of_prospects: new_no_of_prospect }, { where: { id: agentWithLowestProspects.id } });
        await agentEntity_1.default.update({ no_of_prospects: 0 }, { where: { id: oldAgentId } });
        const testUsers = await usersEntity_1.default.findAll({ where: { agent_id: agentWithLowestProspects.id } });
        return response.status(201).json({
            status: `success`,
            message: `User reassigned to ${agentWithLowestProspects.first_name} ${agentWithLowestProspects.last_name}`,
            oldUsers,
            testUsers
        });
    }
    catch (error) {
        console.log(error.message);
        return response.status(500).json({
            status: "error",
            message: `Internal Server Error: ${error}`,
        });
    }
};
exports.reassignAllProspectsOfAnAgent = reassignAllProspectsOfAnAgent;
