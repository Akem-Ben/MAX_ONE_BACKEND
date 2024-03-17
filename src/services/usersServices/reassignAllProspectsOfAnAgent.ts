import { Request, Response } from "express";
import Users, { UserAttributes } from "../../entities/usersEntity";
import Agent, { AgentAttributes } from "../../entities/agentEntity";


//==============FUNCTION FOR REASSIGNING ALL PROSPECTS OF AN AGENT TO ANOTHER AGENT===============//
export const reassignAllProspectsOfAnAgent = async (
  request: Request,
  response: Response
) => {
  try {
    const { oldAgentId } = request.params;

    if (request.query.newAgentId) {
      const agentId: string | any = request.query.newAgentId;

      const oldUsers = await Users.findAll({where: {agent_id: oldAgentId}});

      (await Users.update(
        { agent_id: agentId },
        { where: { agent_id: oldAgentId } }
      )) as unknown as UserAttributes;

      const oldAgent = (await Agent.findOne({
        where: { id: oldAgentId },
      })) as unknown as AgentAttributes;

      const noOfProspectOldAgent = Number(oldAgent.no_of_prospects);

      await Agent.update({ no_of_prospects: 0 }, { where: { id: oldAgentId } });

      const newAgent = (await Agent.findOne({
        where: { id: agentId },
      })) as unknown as AgentAttributes;

      const newNoOfProspectNewAgent =
        newAgent.no_of_prospects + noOfProspectOldAgent;

      await Agent.update(
        { no_of_prospects: newNoOfProspectNewAgent },
        { where: { id: agentId } }
      );

      const testUsers = await Users.findAll({where: {agent_id: agentId}})
      return response.status(201).json({
        status: `success`,
        message: `Users reassigned to ${newAgent.first_name} ${newAgent.last_name}`,
        oldUsers,
        testUsers
      });
    }

    const oldAgent = (await Agent.findOne({
      where: { id: oldAgentId },
    })) as unknown as AgentAttributes;

    const noOfProspectOldAgent = Number(oldAgent.no_of_prospects);

    const searchLocation: string | any = oldAgent.location;

    const agentWithLowestProspects = (await Agent.findOne({
      where: { location: searchLocation },
      order: [["no_of_prospects", "ASC"]],
    })) as unknown as AgentAttributes;

    let new_agent_id = agentWithLowestProspects.id;

    const oldUsers = await Users.findAll({where: {agent_id: oldAgentId}});
 

    (await Users.update(
      { agent_id: new_agent_id },
      { where: { agent_id: oldAgentId } }
    )) as unknown as UserAttributes;

    let new_no_of_prospect =
      agentWithLowestProspects.no_of_prospects + noOfProspectOldAgent;

    await Agent.update(
      { no_of_prospects: new_no_of_prospect },
      { where: { id: agentWithLowestProspects.id } }
    );

    await Agent.update({ no_of_prospects: 0 }, { where: { id: oldAgentId } });

    const testUsers = await Users.findAll({where: {agent_id: agentWithLowestProspects.id}})

    return response.status(201).json({
      status: `success`,
      message: `User reassigned to ${agentWithLowestProspects.first_name} ${agentWithLowestProspects.last_name}`,
      oldUsers,
testUsers
    });
  } catch (error: any) {
    console.log(error.message);
    return response.status(500).json({
      status: "error",
      message: `Internal Server Error: ${error}`,
    });
  }
};
