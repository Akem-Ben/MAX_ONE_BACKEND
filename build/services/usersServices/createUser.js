"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProspect = void 0;
const uuid_1 = require("uuid");
const helpers_1 = require("../../helperFunctions/helpers");
const validations_1 = require("../../validators/validations");
const agentEntity_1 = __importDefault(require("../../entities/agentEntity"));
const locations_interface_1 = require("../../interfaces/locations.interface");
const notification_1 = require("../../utilities/notification");
const usersEntity_1 = __importDefault(require("../../entities/usersEntity"));
const super_admin_entity_1 = __importDefault(require("../../entities/super-admin-entity"));
const stage_interface_1 = require("../../interfaces/stage.interface");
const channel_interface_1 = require("../../interfaces/channel.interface");
const interest_interface_1 = require("../../interfaces/interest.interface");
//==============REGISTRATION FUNCTION FOR CREATING USER/PROSPECT===============//
const createProspect = async (request, response) => {
    try {
        //Fetch the data from the frontend
        const { first_name, last_name, email, phone, location, interest, stage, sub_channel, channel, } = request.body;
        //Validate the input to ensure the required fields have all been filled out
        const validateInput = await validations_1.registerUserSchema.validateAsync(request.body);
        if (validateInput.error) {
            return response.status(400).json({
                Error: validateInput.error.details[0].message,
            });
        }
        //This block of codes ensure that the prospect created is not the same as an existing prospect, agent or the superadmin
        const validateEmailAgent = await agentEntity_1.default.findOne({ where: { email } });
        const validateEmailUser = await usersEntity_1.default.findOne({ where: { email } });
        const validateEmailAdmin = await super_admin_entity_1.default.findOne({ where: { email } });
        if (validateEmailAgent || validateEmailUser || validateEmailAdmin) {
            return response.status(400).json({
                status: `error`,
                message: `${email} already in use`,
            });
        }
        //This block of codes fetch the id from the authorisation function and validates if the creator of the prospect is an agent or super admin
        //If it is an agent, this block of codes ensure that the agent cannot register a prospect outside of his/her location of coverage
        const userID = request.user.id;
        const agent = (await agentEntity_1.default.findOne({
            where: { id: userID },
        }));
        if (agent) {
            if (agent.location !== location.toLowerCase()) {
                return response.status(400).json({
                    status: `error`,
                    message: `You cannot create a prospect outside your location of coverage. Change your location if you wish to work in this location`,
                });
            }
        }
        //This block of codes ensure that prospects are not created outside the area of Max's area of coverage
        const locationKey = location.toUpperCase();
        const code_location = locations_interface_1.Locations[locationKey];
        if (!code_location) {
            return response.status(400).json({
                status: `error`,
                message: `This location does not exist among Max's coverage areas`,
            });
        }
        //This block of codes generate a new password for the prospect using the last name and some four random numbers, then hash the password for extra security
        const newPassword = (0, helpers_1.generatePassword)(last_name.toLowerCase());
        const hashedPassword = await (0, helpers_1.hashPassword)(newPassword);
        //This block of codes is aimed at assigning an agent to the prospect
        let agent_id = "";
        //If the prospect is created by an agent, then the agent's id is attached as an agent Id to the user
        //The agent's number of prospects is incremented by 1 and updated
        if (agent) {
            agent_id = agent.id;
            let new_no_of_prospect = agent.no_of_prospects;
            new_no_of_prospect = new_no_of_prospect + 1;
            await agentEntity_1.default.update({ no_of_prospects: new_no_of_prospect }, { where: { id: agent.id } });
        }
        else {
            //If the prospect is created by a super admin then the agent with the least number of prospects within the prospect's location is found and assigned to the prospect
            const agentWithLowestProspects = (await agentEntity_1.default.findOne({
                where: { location },
                order: [["no_of_prospects", "ASC"]],
            }));
            if (!agentWithLowestProspects) {
                return response.status(404).json({
                    status: "error",
                    message: "no agent found in this location, please use another location",
                });
            }
            agent_id = agentWithLowestProspects.id;
            //Agent's number of prospects is incremented by one and updated
            let new_no_of_prospect = agentWithLowestProspects.no_of_prospects;
            new_no_of_prospect = new_no_of_prospect + 1;
            await agentEntity_1.default.update({ no_of_prospects: new_no_of_prospect }, { where: { id: agentWithLowestProspects.id } });
        }
        //This block of codes assigns a new max code to the user by checking if the prospect is the first in that location.
        //If the prospect is the first in that location, then he/she is assigned a max-code starting with number 1
        const allUsers = (await usersEntity_1.default.findAll({
            where: { location: code_location },
        }));
        let lastUserCode = "";
        let newUserCode = "";
        if (allUsers.length === 0) {
            newUserCode = (0, helpers_1.generateUserCode)(location, lastUserCode);
        }
        else {
            //Yet if the location is not the first in that location, then the user is assigned a max-code that is one number higher than the last user's code
            let userCodes = allUsers.map((user) => {
                const max_id_number = user.max_id.split("-")[2];
                return Number(max_id_number);
            });
            let sortedUsersCodes = userCodes.sort((user1, user2) => user2 - user1);
            lastUserCode = sortedUsersCodes[0].toString();
            newUserCode = (0, helpers_1.generateUserCode)(location, lastUserCode);
        }
        //This block of codes creates a new user
        const newUser = (await usersEntity_1.default.create({
            id: (0, uuid_1.v4)(),
            first_name,
            last_name,
            email,
            phone,
            password: hashedPassword,
            location: code_location,
            stage: `${stage_interface_1.Stage[stage]}`,
            interest: interest_interface_1.Interest[interest],
            agent_id: agent_id,
            max_id: newUserCode,
            sub_channel: channel_interface_1.SubChannel[sub_channel],
            channel: channel_interface_1.Channel[channel],
        }));
        //This block of codes check if the prospect/user was created
        const user = (await usersEntity_1.default.findOne({
            where: { id: newUser.id },
        }));
        if (!user) {
            return response.status(400).json({
                status: "error",
                message: "Something went wrong, try again",
            });
        }
        //This block of codes sends the password to the prospect's mail
        await (0, notification_1.sendPasswordMail)(email, newPassword);
        response.status(201).json({
            status: "success",
            message: "Prospect created successfully",
            user: {
                id: user.id,
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
                phone: user.phone,
                location: user.location,
                stage: user.stage,
                interest: user.interest,
                agent_id: user.agent_id,
                max_id: user.max_id,
                sub_channel: user.sub_channel,
                channel: user.channel
            }
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
exports.createProspect = createProspect;
