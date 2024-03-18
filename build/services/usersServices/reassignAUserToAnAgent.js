"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reassignAProspectToAnAgent = void 0;
const usersEntity_1 = __importDefault(require("../../entities/usersEntity"));
const agentEntity_1 = __importDefault(require("../../entities/agentEntity"));
//==============FUNCTION FOR REASSIGNING A SINGLE PROSPECT OF AN AGENT TO ANOTHER AGENT===============//
const reassignAProspectToAnAgent = async (request, response) => {
    try {
        //The user/prospect id is passed therough the params
        const { userId } = request.params;
        //This block of codes confirms if the agent id is passed through the request.query
        if (request.query.agent_id) {
            const agentId = request.query.agent_id;
            //This block of codes checks if the prospect exists
            const user = (await usersEntity_1.default.findOne({
                where: { id: userId },
            }));
            if (!user) {
                return response.status(404).json({
                    status: `error`,
                    message: `User not found`,
                });
            }
            //This block of codes finds the current agent of the prospect and then reduces the number of prospects assigned to him/her by one
            const oldAgent = (await agentEntity_1.default.findOne({
                where: { id: user.agent_id },
            }));
            (await usersEntity_1.default.update({ agent_id: agentId }, { where: { id: userId } }));
            let newNoOfProspectOldAgent = oldAgent.no_of_prospects;
            newNoOfProspectOldAgent = newNoOfProspectOldAgent - 1;
            await agentEntity_1.default.update({ no_of_prospects: newNoOfProspectOldAgent }, { where: { id: agentId } });
            //This block of codes finds the new agent, confirms the location and reassigns the prospect, increments the agent's number of prospects by one
            const newAgent = (await agentEntity_1.default.findOne({
                where: { id: agentId },
            }));
            if (newAgent.location !== user.location) {
                return response.status(400).json({
                    status: `error`,
                    message: `The user and agent are not in the same location`
                });
            }
            let newNoOfProspectNewAgent = newAgent.no_of_prospects;
            newNoOfProspectNewAgent = newNoOfProspectNewAgent + 1;
            await agentEntity_1.default.update({ no_of_prospects: newNoOfProspectNewAgent }, { where: { id: agentId } });
            const updatedUser = await usersEntity_1.default.findOne({
                where: { id: userId },
            });
            return response.status(201).json({
                status: `success`,
                message: `User reassigned to ${newAgent.first_name} ${newAgent.last_name}`,
                user: updatedUser,
                new_agent: newAgent,
            });
        }
        //If the new agent id is not passed through the request.query then the user is assigned to the next agent with the least prospects in that location
        const user = (await usersEntity_1.default.findOne({
            where: { id: userId },
        }));
        const searchLocation = user.location;
        const agentWithLowestProspects = (await agentEntity_1.default.findOne({
            where: { location: searchLocation },
            order: [["no_of_prospects", "ASC"]],
        }));
        let new_agent_id = agentWithLowestProspects.id;
        let new_no_of_prospect = agentWithLowestProspects.no_of_prospects;
        new_no_of_prospect = new_no_of_prospect + 1;
        await agentEntity_1.default.update({ no_of_prospects: new_no_of_prospect }, { where: { id: agentWithLowestProspects.id } });
        (await usersEntity_1.default.update({ agent_id: new_agent_id }, { where: { id: userId } }));
        const updatedUser = await usersEntity_1.default.findOne({
            where: { id: userId },
        });
        return response.status(201).json({
            status: `success`,
            message: `User reassigned to ${agentWithLowestProspects.first_name} ${agentWithLowestProspects.last_name}`,
            user: updatedUser,
            new_agent: agentWithLowestProspects,
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
exports.reassignAProspectToAnAgent = reassignAProspectToAnAgent;
