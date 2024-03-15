"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Agent = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const locations_interface_1 = require("../interfaces/locations.interface");
let Agent = class Agent {
    constructor() {
        Object.defineProperty(this, "id", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "first_name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "last_name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "email", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "phone", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "password", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "location", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "code", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "created_at", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "updated_at", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
    }
};
exports.Agent = Agent;
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    tslib_1.__metadata("design:type", String)
], Agent.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: false, type: "varchar" }),
    tslib_1.__metadata("design:type", String)
], Agent.prototype, "first_name", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: false, type: "varchar" }),
    tslib_1.__metadata("design:type", String)
], Agent.prototype, "last_name", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: false, type: "varchar" }),
    tslib_1.__metadata("design:type", String)
], Agent.prototype, "email", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: false, type: "varchar" }),
    tslib_1.__metadata("design:type", String)
], Agent.prototype, "phone", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: false, type: "varchar" }),
    tslib_1.__metadata("design:type", String)
], Agent.prototype, "password", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: false, type: "enum", enum: locations_interface_1.Locations }),
    tslib_1.__metadata("design:type", String)
], Agent.prototype, "location", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: false, type: "varchar" }),
    tslib_1.__metadata("design:type", String)
], Agent.prototype, "code", void 0);
tslib_1.__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    tslib_1.__metadata("design:type", Date)
], Agent.prototype, "created_at", void 0);
tslib_1.__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    tslib_1.__metadata("design:type", Date)
], Agent.prototype, "updated_at", void 0);
exports.Agent = Agent = tslib_1.__decorate([
    (0, typeorm_1.Entity)({ name: "agent" })
], Agent);
//# sourceMappingURL=agent.entity.js.map