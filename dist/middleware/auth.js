"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAdmin = exports.requireTourist = exports.requireEmployee = exports.authenticateToken = void 0;
const jwt_1 = require("../utils/jwt");
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "Access token required" });
    }
    try {
        const decoded = jwt_1.JwtUtil.verify(token);
        req.user = decoded;
        next();
    }
    catch (error) {
        return res.status(403).json({ message: "Invalid or expired token" });
    }
};
exports.authenticateToken = authenticateToken;
const requireEmployee = (req, res, next) => {
    if (!req.user || req.user.type !== "employee") {
        return res.status(403).json({ message: "Employee access required" });
    }
    next();
};
exports.requireEmployee = requireEmployee;
const requireTourist = (req, res, next) => {
    if (!req.user || req.user.type !== "tourist") {
        return res.status(403).json({ message: "Tourist access required" });
    }
    next();
};
exports.requireTourist = requireTourist;
const requireAdmin = (req, res, next) => {
    if (!req.user || req.user.type !== "employee" || req.user.role !== "ADMIN") {
        return res.status(403).json({ message: "Admin access required" });
    }
    next();
};
exports.requireAdmin = requireAdmin;
