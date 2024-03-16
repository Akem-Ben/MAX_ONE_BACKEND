"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const getAllUsers_1 = require("../../services/usersServices/getAllUsers");
const getTotalUsers_1 = require("../../services/usersServices/getTotalUsers");
const router = express_1.default.Router();
router.get('/get-all', getAllUsers_1.getAllProspectsSorted);
router.get('/users-by-stages', getTotalUsers_1.getTotalUsersByStages);
exports.default = router;
