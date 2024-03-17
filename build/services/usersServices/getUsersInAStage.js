"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllUserByStageAndChannel = void 0;
const usersEntity_1 = __importDefault(require("../../entities/usersEntity"));
const stage_interface_1 = require("../../interfaces/stage.interface");
const channel_interface_1 = require("../../interfaces/channel.interface");
//==============FUNCTION FOR FETCHING ALL USER/PROSPECT'S IN A PARTICULAR STAGE AND CHANNEL===============//
const getAllUserByStageAndChannel = async (request, response) => {
    try {
        //This block of codes fetches the stage number from the request.query and finds the stage name in the database
        const stage = request.query.stage;
        const setStage = stage_interface_1.Stage[stage];
        //This block of codes checks if the channel number is sent in the request.query and finds the channel name
        if (request.query.channel) {
            const channel = request.query.channel;
            const setChannel = channel_interface_1.Channel[channel];
            //This block of codes fetches all users in the selected stage and selected channel and returns them sorted in descending order of createdAt and updatedAt
            const allUsers = (await usersEntity_1.default.findAll({
                where: { stage: setStage, channel: setChannel },
                order: [["createdAt", "DESC"], ["updatedAt", "DESC"]],
            }));
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
        const allUsers = (await usersEntity_1.default.findAll({
            where: { stage: setStage },
            order: [["createdAt", "DESC"], ["updatedAt", "DESC"]],
        }));
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
    }
    catch (error) {
        return response.status(500).json({
            status: `error`,
            message: `Internal Server Error`,
            error: error.message,
        });
    }
};
exports.getAllUserByStageAndChannel = getAllUserByStageAndChannel;
