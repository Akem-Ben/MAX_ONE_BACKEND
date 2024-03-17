import { Request, Response } from "express";
import Agent from "../../entities/agentEntity";


//==============FETCH ALL AGENTS FUNCTION===============//

export const getAllAgents = async (request: Request, response: Response) => {
  try {

    //This block of codes fetch all agents from the database
    const allagents: any = await Agent.findAll({});

    if (!allagents) {
      return response.status(404).json({
        status: `error`,
        message: `Unable to get all agents`,
      });
    }

    if (allagents.length === 0) {
      return response.status(200).json({
        status: `success`,
        message: `No agents found`,
        allagents,
      });
    }

    return response.status(201).json({
      status: `success`,
      message: `All agents fetched`,
      allagents,
    });
  } catch (error: any) {
    return response.status(500).json({
      status: `error`,
      message: `Internal Server Error`,
      error: error.message,
    });
  }
};
