"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateAgentPassword = exports.generateAgentCode = exports.generateToken = exports.hashPassword = void 0;
const tslib_1 = require("tslib");
const bcryptjs_1 = tslib_1.__importDefault(require("bcryptjs"));
const jsonwebtoken_1 = tslib_1.__importDefault(require("jsonwebtoken"));
const dotenv_1 = tslib_1.__importDefault(require("dotenv"));
const locations_interface_1 = require("../interfaces/locations.interface");
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
    const code_location = locations_interface_1.Code_Locations[location];
    let newCode;
    if (oldCode.length === 0) {
        newCode = `MAX-${code_location}-CH-0001`;
    }
    else {
        newCode = `MAX-${code_location}-CH-${Number(oldCode) + 1}`;
    }
    return newCode;
};
exports.generateAgentCode = generateAgentCode;
const generateAgentPassword = (last_name) => {
    const newPassword = last_name += Math.floor(1000 + Math.random() * 90000);
    return newPassword;
};
exports.generateAgentPassword = generateAgentPassword;
//# sourceMappingURL=helpers.js.map