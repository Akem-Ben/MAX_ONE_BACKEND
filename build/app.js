"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const dotenv_1 = tslib_1.__importDefault(require("dotenv"));
const configurations_1 = require("./configurations");
const body_parser_1 = tslib_1.__importDefault(require("body-parser"));
const morgan_1 = tslib_1.__importDefault(require("morgan"));
const cookie_parser_1 = tslib_1.__importDefault(require("cookie-parser"));
const cors_1 = tslib_1.__importDefault(require("cors"));
const super_admin_routes_1 = tslib_1.__importDefault(require("./routes/super-admin.routes"));
const app = (0, express_1.default)();
dotenv_1.default.config();
app.use(body_parser_1.default.json());
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cors_1.default)());
app.use('superAdmin', super_admin_routes_1.default);
configurations_1.database.initialize().then(() => {
    console.log("Database is connected");
}).catch((err) => {
    console.log(err);
});
app.listen(process.env.Port, () => {
    console.log(`server running on port ${process.env.Port}`);
});
//# sourceMappingURL=app.js.map