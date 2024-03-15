"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = exports.hashPassword = void 0;
const tslib_1 = require("tslib");
const bcryptjs_1 = tslib_1.__importDefault(require("bcryptjs"));
const jsonwebtoken_1 = tslib_1.__importDefault(require("jsonwebtoken"));
const dotenv_1 = tslib_1.__importDefault(require("dotenv"));
dotenv_1.default.config();
const hashPassword = async (password) => {
    const saltRounds = 10;
    const salt = await bcryptjs_1.default.genSalt(saltRounds);
    const hash = await bcryptjs_1.default.hash(password, salt);
    return hash;
};
exports.hashPassword = hashPassword;
const generateToken = (data) => {
    return jsonwebtoken_1.default.sign(data.data, `${process.env.APP_SECRET}`, { expiresIn: `${data.expires}` });
};
exports.generateToken = generateToken;
//# sourceMappingURL=helpers.js.map