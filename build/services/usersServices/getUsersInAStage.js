"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllUserByStageAndChannel = void 0;
const usersEntity_1 = __importDefault(require("../../entities/usersEntity"));
const stage_interface_1 = require("../../interfaces/stage.interface");
const channel_interface_1 = require("../../interfaces/channel.interface");
const getAllUserByStageAndChannel = async (request, response) => {
    try {
        const stage = request.query.stage;
        const setStage = stage_interface_1.Stage[stage];
        if (request.query.channel) {
            const channel = request.query.channel;
            const setChannel = channel_interface_1.Channel[channel];
            const allUsers = (await usersEntity_1.default.findAll({
                where: { stage: setStage, channel: setChannel },
                order: [["createdAt", "DESC"]],
            }));
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
        const allUsers = (await usersEntity_1.default.findAll({
            where: { stage: setStage },
            order: [["createdAt", "DESC"]],
        }));
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
