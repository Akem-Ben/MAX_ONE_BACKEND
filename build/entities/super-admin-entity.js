"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SuperAdmin = void 0;
const sequelize_1 = require("sequelize");
const index_1 = require("../configurations/index");
class SuperAdmin extends sequelize_1.Model {
}
exports.SuperAdmin = SuperAdmin;
SuperAdmin.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
    },
    first_name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    last_name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    phone: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: "Password is required",
            },
            notEmpty: {
                msg: "Password is required",
            },
        },
    },
}, {
    sequelize: index_1.database,
    tableName: "SuperAdmin",
});
exports.default = SuperAdmin;
