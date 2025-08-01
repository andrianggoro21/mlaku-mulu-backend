"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtUtil = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class JwtUtil {
    static sign(payload) {
        const options = { expiresIn: this.expiresIn };
        return jsonwebtoken_1.default.sign(payload, this.secret, options);
    }
    static verify(token) {
        return jsonwebtoken_1.default.verify(token, this.secret);
    }
}
exports.JwtUtil = JwtUtil;
JwtUtil.secret = process.env.JWT_SECRET || "fallback-secret";
JwtUtil.expiresIn = (process.env
    .JWT_EXPIRES_IN || "7d");
