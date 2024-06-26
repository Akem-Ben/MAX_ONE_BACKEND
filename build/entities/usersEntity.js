"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Users = void 0;
const sequelize_1 = require("sequelize");
const index_1 = require("../configurations/index");
const locations_interface_1 = require("../interfaces/locations.interface");
class Users extends sequelize_1.Model {
}
exports.Users = Users;
Users.init({
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
        allowNull: false,
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
    location: {
        type: sequelize_1.DataTypes.ENUM(...Object.values(locations_interface_1.Locations)),
        allowNull: false,
    },
    stage: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    interest: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    max_id: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    agent_id: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
    },
    sub_channel: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    channel: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
}, {
    timestamps: true,
    sequelize: index_1.database,
    tableName: "Users",
});
exports.default = Users;
