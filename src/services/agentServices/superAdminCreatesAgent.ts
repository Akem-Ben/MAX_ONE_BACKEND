import { Request, Response } from "express";
import { v4 } from "uuid";
import {
  generateAgentCode,
  generatePassword,
  hashPassword,
} from "../../helperFunctions/helpers";
import { registerAgentSchema } from "../../validators/validations";
import Agent, { AgentAttributes } from "../../entities/agentEntity";
import { Locations } from "../../interfaces/locations.interface";
import { sendPasswordMail } from "../../utilities/notification";
import Users from "../../entities/usersEntity";
import SuperAdmin from "../../entities/super-admin-entity";

//==============REGISTRATION FUNCTION FOR CREATING AGENT===============//

export const createAgent = async (request: Request, response: Response) => {
  try {

    //This blcok of codes fetch and validate the required input from the request body
    const { first_name, last_name, email, phone, location } = request.body;

    const validateInput = await registerAgentSchema.validateAsync(request.body);

    if (validateInput.error) {
      return response.status(400).json({
        Error: validateInput.error.details[0].message,
      });
    }

    //This block of codes check if the email already exists in the database for the admin, user and agent.
    const validateAgentEmail = await Agent.findOne({ where: { email } });

    const validateUserEmail = await Users.findOne({ where: { email } });

    const validateAdminEmail = await SuperAdmin.findOne({ where: { email } });

    if (validateAgentEmail || validateUserEmail || validateAdminEmail) {
      return response.status(400).json({
        status: `error`,
        message: `${email} already in use as either agent, admin or user`,
      });
    }

    //This block of codes check if the agent's location exists in the database
    const locationKey = location.toUpperCase() as keyof typeof Locations;

    const code_location = Locations[locationKey];

    if (!code_location) {
      return response.status(400).json({
        status: `error`,
        message: `This location does not exist among Max coverage areas`,
      });
    }

    //This block of codes generate and hash a new password for the agent
    const newPassword = generatePassword(last_name.toLowerCase());

    const hashedPassword = await hashPassword(newPassword);

    //This block of codes is aimed at generating a new agent code for the agent
    //It checks if there are agents in the database within the same location as the agent about to be registered 
    const allagents: any = (await Agent.findAll({
      where: { location: code_location },
    })) as unknown as AgentAttributes;

    let lastAgentCode: string = "";
    let newAgentCode: string = "";

    //If agents do not exist within the location, then the new agent is assigned a new code generated automaticaly with a helper function
    if (allagents.length === 0) {
      newAgentCode = generateAgentCode(location, lastAgentCode);
    } else {
      //If agents exist within the lcation, then the new agent is assigned a code that is one number higher than the last agent's code
      let agentsCodes: number[] = allagents.map((a: AgentAttributes) => {
        const max_id_number = a.agent_max_id.split("-")[3];
        return Number(max_id_number);
      });
      let sortedAgentsCodes: number[] = agentsCodes.sort(
        (agent1: number, agent2: number) => agent2 - agent1
      );
      lastAgentCode = sortedAgentsCodes[0].toString();
      newAgentCode = generateAgentCode(location, lastAgentCode);
    }

    //This block of codes create a new agent
    const newAgent = (await Agent.create({
      id: v4(),
      first_name,
      last_name,
      email,
      phone,
      password: hashedPassword,
      location: code_location,
      agent_max_id: newAgentCode,
      no_of_prospects: 0,
    })) as unknown as AgentAttributes;

    //This block of codes check if the new agent was created successfully
    const newAgentInstance = await Agent.findOne({
      where: { id: newAgent.id },
    }) as unknown as AgentAttributes;

    if (!newAgentInstance) {
      return response.status(400).json({
        status: "error",
        message: "Something went wrong, try again",
      });
    }

    //This sends the new agent's password to the agent's email
    await sendPasswordMail(email, newPassword);

    response.status(201).json({
      status: "success",
      message: "Agent created successfully",
      agent: {
        id: newAgentInstance.id,
        first_name: newAgentInstance.first_name,
        last_name: newAgentInstance.last_name,
        email: newAgentInstance.email,
        phone: newAgentInstance.phone,
        location: newAgentInstance.location,
        agent_max_id: newAgentInstance.agent_max_id,
        no_of_prospects: newAgentInstance.no_of_prospects
      },
    });
    
  } catch (error: any) {
    return response.status(500).json({
      status: "error",
      message: `Internal Server Error: ${error}`,
    });
  }
};
