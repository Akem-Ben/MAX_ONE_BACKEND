"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.queryFilter = exports.generatePassword = exports.generateUserCode = exports.generateAgentCode = exports.generateToken = exports.hashPassword = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const locations_interface_1 = require("../interfaces/locations.interface");
const sequelize_1 = require("sequelize");
dotenv_1.default.config();
const hashPassword = async (password) => {
    const saltRounds = 10;
    const salt = await bcryptjs_1.default.genSalt(saltRounds);
    const hash = await bcryptjs_1.default.hash(password, salt);
    return hash;
};
exports.hashPassword = hashPassword;
const generateToken = async (data) => {
    return jsonwebtoken_1.default.sign(data, `${process.env.APP_SECRET}`, { expiresIn: `15h` });
};
exports.generateToken = generateToken;
const generateAgentCode = (location, oldCode) => {
    location = location.toUpperCase();
    const locationKey = location.toUpperCase();
    const code_location = locations_interface_1.Code_Locations[locationKey];
    let newCode;
    if (oldCode.length === 0) {
        newCode = `MAX-${code_location}-CH-1`;
    }
    else {
        newCode = `MAX-${code_location}-CH-${Number(oldCode) + 1}`;
    }
    return newCode;
};
exports.generateAgentCode = generateAgentCode;
const generateUserCode = (location, oldCode) => {
    location = location.toUpperCase();
    const locationKey = location.toUpperCase();
    const code_location = locations_interface_1.Code_Locations[locationKey];
    let newCode;
    if (oldCode.length === 0) {
        newCode = `MAX-${code_location}-1`;
    }
    else {
        newCode = `MAX-${code_location}-${Number(oldCode) + 1}`;
    }
    return newCode;
};
exports.generateUserCode = generateUserCode;
const generatePassword = (last_name) => {
    const newPassword = (last_name += Math.floor(1000 + Math.random() * 90000));
    return newPassword;
};
exports.generatePassword = generatePassword;
const queryFilter = async (queryItem) => {
    const query = {};
    if (queryItem?.location)
        query["location"] = queryItem.location.toLowerCase();
    if (queryItem?.first_name)
        query["first_name"] = queryItem.first_name;
    if (queryItem?.last_name)
        query["last_name"] = queryItem.last_name;
    if (queryItem?.phone)
        query["phone"] = queryItem.phone;
    if (queryItem?.start_date && queryItem?.end_date) {
        query.createdAt = {
            [sequelize_1.Op.between]: [queryItem.start_date, queryItem.end_date],
        };
    }
    else if (queryItem?.start_date) {
        query.createdAt = {
            [sequelize_1.Op.gte]: queryItem.start_date,
        };
    }
    else if (queryItem?.end_date) {
        query.createdAt = {
            [sequelize_1.Op.lte]: queryItem.end_date,
        };
    }
    return query;
};
exports.queryFilter = queryFilter;
