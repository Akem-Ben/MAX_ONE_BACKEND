"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generalAuthorisationFunction = exports.superAdminAuthorizationFunction = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const super_admin_entity_1 = __importDefault(require("../entities/super-admin-entity"));
const agentEntity_1 = __importDefault(require("../entities/agentEntity"));
//==============AUTHORISATION FUNCTION FOR THE SUPERADMIN===============//
const superAdminAuthorizationFunction = async (request, response, next) => {
    try {
        //This block of codes check if the token is present in the request header
        const authorization = request.headers.authorization;
        if (authorization === undefined) {
            return response.status(401).json({
                message: `You are not authorized to view this page, login please`,
            });
        }
        //This block of codes extract the token from the request header
        const token = authorization.split(" ");
        const mainToken = token[1];
        if (!mainToken || mainToken === "") {
            return response.status(401).json({
                status: `Failed`,
                message: `Login required`,
            });
        }
        //This block of codes verify the token and validate that the user is a superadmin
        const decode = jsonwebtoken_1.default.verify(mainToken, `${process.env.APP_SECRET}`);
        const superAdmin = await super_admin_entity_1.default.findOne({
            where: { id: decode.id },
        });
        if (!superAdmin) {
            return response.status(400).json({
                status: `error`,
                message: `Only admin can access this resource`,
            });
        }
        //This block of codes assign the admin details extracted from the code to the request object
        request.user = decode;
        next();
    }
    catch (error) {
        if (error.message === 'jwt expired') {
            return response.status(401).json({
                status: 'error',
                message: 'Session Expired. Please log in again.',
            });
        }
        console.log(error.message);
        return response.status(500).json({
            status: `error`,
            message: `Internal Server Error: ${error}`,
        });
    }
};
exports.superAdminAuthorizationFunction = superAdminAuthorizationFunction;
//==============GENERAL AUTHORISATION FUNCTION THAT WORKS WITH BOTH ADMIN AND AGENTS===============//
const generalAuthorisationFunction = async (request, response, next) => {
    try {
        //This block of codes check if the token is present in the request header
        const authorization = request.headers.authorization;
        if (authorization === undefined) {
            return response.status(401).json({
                message: `You are not authorized to view this page, login please`,
            });
        }
        //This block of codes extract the token from the request header
        const token = authorization.split(" ");
        const mainToken = token[1];
        if (!mainToken || mainToken === "") {
            return response.status(401).json({
                status: `Failed`,
                message: `Login required`,
            });
        }
        //This block of codes verify the token and validate that the user is either a superadmin or an agent
        const decode = jsonwebtoken_1.default.verify(mainToken, `${process.env.APP_SECRET}`);
        const superAdmin = await super_admin_entity_1.default.findOne({
            where: { id: decode.id },
        });
        const agent = await agentEntity_1.default.findOne({ where: { id: decode.id } });
        if (!superAdmin && !agent) {
            return response.status(400).json({
                status: `error`,
                message: `You are not allowed to access this resource. Only the admin or agent can access this resource`,
            });
        }
        //This block of codes assign the user details extracted from the code to the request object
        request.user = decode;
        next();
    }
    catch (error) {
        if (error.message === 'jwt expired') {
            return response.status(401).json({
                status: 'error',
                message: 'Session Expired. Please log in again.',
            });
        }
        console.log(error.message);
        return response.status(500).json({
            status: `error`,
            message: `Internal Server Error: ${error}`,
        });
    }
};
exports.generalAuthorisationFunction = generalAuthorisationFunction;
