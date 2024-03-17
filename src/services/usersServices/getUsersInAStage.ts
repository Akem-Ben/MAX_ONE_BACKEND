import { Request, Response } from "express";
import Agent from "../../entities/agentEntity";
import Users, { UserAttributes } from "../../entities/usersEntity";
import { Stage } from "../../interfaces/stage.interface";
import { Channel } from "../../interfaces/channel.interface";

//==============FUNCTION FOR FETCHING ALL USER/PROSPECT'S IN A PARTICULAR STAGE AND CHANNEL===============//
export const getAllUserByStageAndChannel = async (
  request: Request,
  response: Response
) => {
  try {

    //This block of codes fetches the stage number from the request.query and finds the stage name in the database
    const stage: number | any = request.query.stage;

    const setStage = Stage[stage];

    //This block of codes checks if the channel number is sent in the request.query and finds the channel name
    if (request.query.channel) {
      const channel: number | any = request.query.channel;

      const setChannel = Channel[channel];

    //This block of codes fetches all users in the selected stage and selected channel and returns them sorted in descending order of createdAt and updatedAt
      const allUsers = (await Users.findAll({
        where: { stage: setStage, channel: setChannel },
        order: [["createdAt", "DESC"],["updatedAt", "DESC"]],
      })) as unknown as UserAttributes;

      if (!allUsers) {
        return response.status(404).json({
          status: `error`,
          message: `Unable to get all users`,
        });
      }

      return response.status(201).json({
        status: `success`,
        message: `All users in stage: ${setStage} and channel: ${setChannel} fetched`,
        allUsers,
      });
    }

    //If there is no channel in the request.query, this block of codes fetches all users in the selected stage and returns them sorted in descending order of createdAt and updatedAt

    const allUsers = (await Users.findAll({
      where: { stage: setStage },
      order: [["createdAt", "DESC"], ["updatedAt", "DESC"]],
    })) as unknown as UserAttributes;

    if (!allUsers) {
      return response.status(404).json({
        status: `error`,
        message: `Unable to get all users`,
      });
    }

    return response.status(201).json({
      status: `success`,
      message: `All users in stage: ${setStage} fetched`,
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
