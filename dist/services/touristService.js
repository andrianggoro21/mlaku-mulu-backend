"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TouristService = void 0;
const touristRepository_1 = require("../repositories/touristRepository");
const password_1 = require("../utils/password");
class TouristService {
    constructor() {
        this.touristRepository = new touristRepository_1.TouristRepository();
    }
    createTourist(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingTourist = yield this.touristRepository.findByUsername(data.username);
            if (existingTourist) {
                throw new Error("Username already exists");
            }
            const existingEmail = yield this.touristRepository.findByEmail(data.email);
            if (existingEmail) {
                throw new Error("Email already exists");
            }
            const dateOfBirth = data.dateOfBirth ? new Date(data.dateOfBirth) : null;
            const hashedPassword = yield password_1.PasswordUtil.hash(data.password);
            const tourist = yield this.touristRepository.create(Object.assign(Object.assign({}, data), { password: hashedPassword, dateOfBirth }));
            const { password } = tourist, touristWithoutPassword = __rest(tourist, ["password"]);
            return touristWithoutPassword;
        });
    }
    getAllTourists() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.touristRepository.findAll();
        });
    }
    getTouristById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const tourist = yield this.touristRepository.findById(id);
            if (!tourist) {
                throw new Error("Tourist not found");
            }
            const { password } = tourist, touristWithoutPassword = __rest(tourist, ["password"]);
            return touristWithoutPassword;
        });
    }
    updateTourist(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const tourist = yield this.touristRepository.findById(id);
            if (!tourist) {
                throw new Error("Tourist not found");
            }
            if (data.password) {
                data.password = yield password_1.PasswordUtil.hash(data.password);
            }
            if (data.dateOfBirth) {
                data.dateOfBirth = new Date(data.dateOfBirth);
            }
            const updatedTourist = yield this.touristRepository.update(id, data);
            const { password } = updatedTourist, touristWithoutPassword = __rest(updatedTourist, ["password"]);
            return touristWithoutPassword;
        });
    }
    deleteTourist(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const tourist = yield this.touristRepository.findById(id);
            if (!tourist) {
                throw new Error("Tourist not found");
            }
            return this.touristRepository.delete(id);
        });
    }
}
exports.TouristService = TouristService;
