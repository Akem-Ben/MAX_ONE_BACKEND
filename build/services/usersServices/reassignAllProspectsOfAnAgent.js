"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reassignAllProspectsOfAnAgent = void 0;
const usersEntity_1 = __importDefault(require("../../entities/usersEntity"));
const agentEntity_1 = __importDefault(require("../../entities/agentEntity"));
//==============FUNCTION FOR REASSIGNING ALL PROSPECTS OF AN AGENT TO ANOTHER AGENT===============//
const reassignAllProspectsOfAnAgent = async (request, response) => {
    try {
        //Old agent's id is fetched from the request.params
        const { oldAgentId } = request.params;
        //This next block of codes handles the reassignment if the new agentId is sent in the request.query
        if (request.query.newAgentId) {
            const agentId = request.query.newAgentId;
            //This block of codes finds all the prospects assigned to the old agents and then reassigns them to the new agent
            const oldUsers = await usersEntity_1.default.findAll({
                where: { agent_id: oldAgentId },
            });
            for (const user of oldUsers) {
                await usersEntity_1.default.update({ agent_id: agentId }, { where: { id: user.id } });
            }
            //This block of codes finds the old agent and updates the number of prospects to zero
            const oldAgent = (await agentEntity_1.default.findOne({
                where: { id: oldAgentId },
            }));
            const noOfProspectOldAgent = Number(oldAgent.no_of_prospects);
            await agentEntity_1.default.update({ no_of_prospects: 0 }, { where: { id: oldAgentId } });
            //This finds the new agent and updates the number of prospects
            const newAgent = (await agentEntity_1.default.findOne({
                where: { id: agentId },
            }));
            let newNoOfProspectNewAgent = newAgent.no_of_prospects;
            newNoOfProspectNewAgent = newNoOfProspectNewAgent + noOfProspectOldAgent;
            await agentEntity_1.default.update({ no_of_prospects: newNoOfProspectNewAgent }, { where: { id: agentId } });
            return response.status(201).json({
                status: `success`,
                message: `Users reassigned to ${newAgent.first_name} ${newAgent.last_name}`,
            });
        }
        //If the new agent Id is not passed in the request.query, another agent with the least number of prospects within that location is found
        //The users are reassigned and updates are made accordingly.
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
        for (const user of oldUsers) {
            await usersEntity_1.default.update({ agent_id: new_agent_id }, { where: { agent_id: oldAgentId } });
        }
        let new_no_of_prospect = agentWithLowestProspects.no_of_prospects;
        new_no_of_prospect = new_no_of_prospect + noOfProspectOldAgent;
        await agentEntity_1.default.update({ no_of_prospects: new_no_of_prospect }, { where: { id: agentWithLowestProspects.id } });
        await agentEntity_1.default.update({ no_of_prospects: 0 }, { where: { id: oldAgentId } });
        return response.status(201).json({
            status: `success`,
            message: `Users reassigned to ${agentWithLowestProspects.first_name} ${agentWithLowestProspects.last_name}`,
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
