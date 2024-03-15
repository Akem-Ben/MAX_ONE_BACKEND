"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.database = void 0;
const tslib_1 = require("tslib");
const sequelize_1 = require("sequelize");
const config_1 = tslib_1.__importDefault(require("./config"));
const { DB_PORT, DB_NAME, DB_USERNAME, DB_HOST, DB_PASSWORD } = config_1.default;
exports.database = new sequelize_1.Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
    host: DB_HOST,
    port: DB_PORT,
    dialect: "postgres",
    logging: false,
    dialectOptions: {
        encrypt: true
    },
    sync: { force: true }
});
//# sourceMappingURL=index.js.map