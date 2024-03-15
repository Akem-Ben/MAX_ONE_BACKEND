"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.database = void 0;
const typeorm_1 = require("typeorm");
const config_1 = __importDefault(require("./config"));
const { DB_PORT, DB_NAME, DB_USERNAME, DB_HOST, DB_PASSWORD } = config_1.default;
exports.database = new typeorm_1.DataSource({
    type: 'postgres',
    host: DB_HOST,
    port: DB_PORT,
    username: DB_USERNAME,
    password: DB_PASSWORD,
    entities: ['{src,build}/**/entities/*.entity{.ts,.js}'],
    synchronize: true,
    logging: true,
});
