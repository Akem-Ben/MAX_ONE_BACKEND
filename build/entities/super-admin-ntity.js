"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SuperAdmin = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
let SuperAdmin = class SuperAdmin {
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
exports.SuperAdmin = SuperAdmin;
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    tslib_1.__metadata("design:type", String)
], SuperAdmin.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: false, type: "varchar" }),
    tslib_1.__metadata("design:type", String)
], SuperAdmin.prototype, "first_name", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: false, type: "varchar" }),
    tslib_1.__metadata("design:type", String)
], SuperAdmin.prototype, "last_name", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: false, type: "varchar" }),
    tslib_1.__metadata("design:type", String)
], SuperAdmin.prototype, "email", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: false, type: "varchar" }),
    tslib_1.__metadata("design:type", String)
], SuperAdmin.prototype, "phone", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: false, type: "varchar" }),
    tslib_1.__metadata("design:type", String)
], SuperAdmin.prototype, "password", void 0);
tslib_1.__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    tslib_1.__metadata("design:type", Date)
], SuperAdmin.prototype, "created_at", void 0);
tslib_1.__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    tslib_1.__metadata("design:type", Date)
], SuperAdmin.prototype, "updated_at", void 0);
exports.SuperAdmin = SuperAdmin = tslib_1.__decorate([
    (0, typeorm_1.Entity)({ name: "super_admin" })
], SuperAdmin);
//# sourceMappingURL=super-admin-ntity.js.map