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
const createProspect = async (request, response) => {
    try {
        //Fetch the data from the frontend
        const { first_name, last_name, email, phone, location, interest, stage, sub_channel, channel } = request.body;
        //Validate the input to ensure the required fields have all been filled out
        const validateInput = await validations_1.registerUserSchema.validateAsync(request.body);
        if (validateInput.error) {
            return response.status(400).json({
                Error: validateInput.error.details[0].message,
            });
        }
        //This block of codes ensures that the prospect created is not the same as an existing prospect, agent or the superadmin
        const validateEmailAgent = await agentEntity_1.default.findOne({ where: { email } });
        const validateEmailUser = await usersEntity_1.default.findOne({ where: { email } });
        const validateEmailAdmin = await super_admin_entity_1.default.findOne({ where: { email } });
        if (validateEmailAgent || validateEmailUser || validateEmailAdmin) {
            return response.status(400).json({
                status: `error`,
                message: `${email} already in use`,
            });
        }
        //This block of codes fetches the id from the authorisation function to ensure that an agent cannot register a prospect outside of his/her location of coverage
        const userID = request.user.id;
        const agent = await agentEntity_1.default.findOne({ where: { id: userID } });
        if (agent) {
            if (agent.location !== location.toLowerCase()) {
                return response.status(400).json({
                    status: `error`,
                    message: `You cannot create a prospect outside your location of coverage. Change your location if you wish to work in this location`
                });
            }
        }
        //This block of codes ensures that prospects are not created outside the area of Max's area of coverage
        const locationKey = location.toUpperCase();
        const code_location = locations_interface_1.Locations[locationKey];
        if (!code_location) {
            return response.status(400).json({
                status: `error`,
                message: `This location does not exist among Max's coverage areas`
            });
        }
        //generate a new password for the prospect using the last name and some four random numbers, then hash the password for extra security
        const newPassword = (0, helpers_1.generatePassword)(last_name.toLowerCase());
        const hashedPassword = await (0, helpers_1.hashPassword)(newPassword);
        let agent_id = '';
        if (agent) {
            agent_id = agent.id;
        }
        else {
            const agentWithLowestProspects = await agentEntity_1.default.findOne({
                where: { location },
                order: [['no_of_prospects', 'ASC']]
            });
            if (!agentWithLowestProspects) {
                return response.status(404).json({
                    status: "error",
                    message: "no agent found in this location, please use another location"
                });
            }
            agent_id = agentWithLowestProspects.id;
            let new_no_of_prospect = agentWithLowestProspects.no_of_prospects;
            new_no_of_prospect = new_no_of_prospect + 1;
            await agentEntity_1.default.update({ no_of_prospects: new_no_of_prospect }, { where: { id: agentWithLowestProspects.id } });
        }
        const allUsers = await usersEntity_1.default.findAll({ where: { location: code_location } });
        let lastUserCode = '';
        let newUserCode = '';
        if (allUsers.length === 0) {
            newUserCode = (0, helpers_1.generateUserCode)(location, lastUserCode);
        }
        else {
            let userCodes = allUsers.map((user) => {
                const max_id_number = user.max_id.split('-')[2];
                return Number(max_id_number);
            });
            let sortedUsersCodes = userCodes.sort((user1, user2) => user2 - user1);
            lastUserCode = sortedUsersCodes[0].toString();
            newUserCode = (0, helpers_1.generateUserCode)(location, lastUserCode);
        }
        const newUser = await usersEntity_1.default.create({
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
            channel: channel_interface_1.Channel[channel]
        });
        const user = await usersEntity_1.default.findOne({ where: { id: newUser.id } });
        if (!user) {
            return response.status(400).json({
                status: "error",
                message: "Something went wrong, try again"
            });
        }
        await (0, notification_1.sendPasswordMail)(email, newPassword);
        const newUserz = delete user.password;
        response.status(201).json({
            status: "success",
            message: "Prospect created successfully",
            user,
            newUserz
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
exports.createProspect = createProspect;
