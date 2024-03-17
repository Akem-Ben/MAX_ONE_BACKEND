"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const configurations_1 = require("./configurations");
const body_parser_1 = __importDefault(require("body-parser"));
const morgan_1 = __importDefault(require("morgan"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const super_admin_routes_1 = __importDefault(require("./routes/superAdminRoutes/super-admin.routes"));
const agent_routes_1 = __importDefault(require("./routes/agentRoutes/agent.routes"));
const user_routes_1 = __importDefault(require("./routes/userRoutes/user.routes"));
const app = (0, express_1.default)();
dotenv_1.default.config();
//Middlewares
app.use(body_parser_1.default.json());
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cors_1.default)());
//Routes
app.use('/superAdmin', super_admin_routes_1.default);
app.use('/agent', agent_routes_1.default);
app.use('/users', user_routes_1.default);
//Database connection
configurations_1.database.sync({}).then(() => {
    console.log("Database is connected");
}).catch((err) => {
    console.log(err);
});
//Server
app.listen(process.env.Port, () => {
    console.log(`server running on port ${process.env.Port}`);
});
