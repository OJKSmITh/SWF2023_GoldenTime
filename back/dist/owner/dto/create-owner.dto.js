"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateOwnerDto = exports.ownerEnum = void 0;
const class_validator_1 = require("class-validator");
var ownerEnum;
(function (ownerEnum) {
    ownerEnum[ownerEnum["ambulance"] = 0] = "ambulance";
    ownerEnum[ownerEnum["hospital"] = 1] = "hospital";
})(ownerEnum || (exports.ownerEnum = ownerEnum = {}));
class CreateOwnerDto {
}
exports.CreateOwnerDto = CreateOwnerDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsEnum)(ownerEnum),
    __metadata("design:type", String)
], CreateOwnerDto.prototype, "owner", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(42, { message: 'account의 길이는 최소 42여야 합니다.' }),
    __metadata("design:type", String)
], CreateOwnerDto.prototype, "account", void 0);
//# sourceMappingURL=create-owner.dto.js.map