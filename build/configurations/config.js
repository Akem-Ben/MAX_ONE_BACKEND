"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const lodash_merge_1 = tslib_1.__importDefault(require("lodash.merge"));
const dotenv_1 = tslib_1.__importDefault(require("dotenv"));
dotenv_1.default.config();
const stage = process.env.NODE_ENV;
let config;
if (stage === "development") {
    config = require("./development").default;
}
else if (stage === "production") {
    config = require("./production").default;
}
exports.default = (0, lodash_merge_1.default)({
    stage
}, config);
//# sourceMappingURL=config.js.map