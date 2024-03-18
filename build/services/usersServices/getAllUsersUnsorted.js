"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllProspectsUnsorted = void 0;
const usersEntity_1 = __importDefault(require("../../entities/usersEntity"));
//==============FUNCTION FOR FETCHING ALL USER/PROSPECT'S IN A SORTED FASHION===============//
const getAllProspectsUnsorted = async (request, response) => {
    try {
        //This block of codes fetches all the propects
        const users = (await usersEntity_1.default.findAndCountAll({}));
        if (!users) {
            return response.status(404).json({
                status: `error`,
                message: `Unable to fetch users`,
            });
        }
        return response.status(200).json({
            status: `success`,
            message: `Users found`,
            users,
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
exports.getAllProspectsUnsorted = getAllProspectsUnsorted;
