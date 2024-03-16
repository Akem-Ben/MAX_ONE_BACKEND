import { Request, Response } from "express";
import Agent from "../../entities/agentEntity";
import Users, { UserAttributes } from "../../entities/usersEntity";
import { Stage } from "../../interfaces/stage.interface";
import { Channel } from "../../interfaces/channel.interface";

export const getAllUserByStageAndChannel = async (
  request: Request,
  response: Response
) => {
  try {
    const stage: number | any = request.query.stage;

    const setStage = Stage[stage];

    if (request.query.channel) {
      const channel: number | any = request.query.channel;

      const setChannel = Channel[channel];

      const allUsers = (await Users.findAll({
        where: { stage: setStage, channel: setChannel },
        order: [["createdAt", "DESC"]],
      })) as unknown as UserAttributes;

      if (!allUsers) {
        return response.status(404).json({
          status: `error`,
          message: `Unable to get all users`,
        });
      }

      return response.status(201).json({
        status: `success`,
        message: `All users in stage: ${stage} and channel: ${channel} fetched`,
        allUsers,
      });
    }

    const allUsers = (await Users.findAll({
      where: { stage: setStage },
      order: [["createdAt", "DESC"]],
    })) as unknown as UserAttributes;

    if (!allUsers) {
      return response.status(404).json({
        status: `error`,
        message: `Unable to get all users`,
      });
    }

    return response.status(201).json({
      status: `success`,
      message: `All users in stage: ${stage} fetched`,
      allUsers,
    });
  } catch (error: any) {
    return response.status(500).json({
      status: `error`,
      message: `Internal Server Error`,
      error: error.message,
    });
  }
};
