"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllProspectsSorted = void 0;
const helpers_1 = require("../../helperFunctions/helpers");
const usersEntity_1 = __importDefault(require("../../entities/usersEntity"));
const getAllProspectsSorted = async (request, response) => {
    try {
        const query = await (0, helpers_1.queryFilter)(request.query || {});
        const size = Number(request.query.size) || 10;
        const skip = (Number(request.query.page) - 1) * size || 0;
        const users = await usersEntity_1.default.findAndCountAll({
            where: query,
            order: [['createdAt', 'DESC']],
            limit: size,
            offset: skip
        });
        if (!users) {
            return response.status(404).json({
                status: `error`,
                message: `Unable to fetch users`
            });
        }
        return response.status(200).json({
            status: `success`,
            message: `Users found`,
            users
        });
    }
    catch (error) {
        console.log(error.message);
        return response.status(500).json({
            status: "error",
            message: `Internal Server Error: ${error}`
        });
    }
};
exports.getAllProspectsSorted = getAllProspectsSorted;
