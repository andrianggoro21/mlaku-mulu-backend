"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateLogin = exports.validateCreateTravel = exports.validateCreateTourist = exports.validateCreateEmployee = void 0;
const validateCreateEmployee = (req, res, next) => {
    const { email, username, password, name } = req.body;
    if (!email || !username || !password || !name) {
        return res.status(400).json({
            status: "error",
            message: "Email, username, password, and name are required",
        });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({
            status: "error",
            message: "Invalid email format",
        });
    }
    if (password.length < 6) {
        return res.status(400).json({
            status: "error",
            message: "Password must be at least 6 characters long",
        });
    }
    next();
};
exports.validateCreateEmployee = validateCreateEmployee;
const validateCreateTourist = (req, res, next) => {
    const { email, username, password, name } = req.body;
    if (!email || !username || !password || !name) {
        return res.status(400).json({
            status: "error",
            message: "Email, username, password, and name are required",
        });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({
            status: "error",
            message: "Invalid email format",
        });
    }
    if (password.length < 6) {
        return res.status(400).json({
            status: "error",
            message: "Password must be at least 6 characters long",
        });
    }
    next();
};
exports.validateCreateTourist = validateCreateTourist;
const validateCreateTravel = (req, res, next) => {
    const { touristId, tanggalMulaiPerjalanan, tanggalBerakhirPerjalanan, destinasiPerjalanan, } = req.body;
    if (!touristId ||
        !tanggalMulaiPerjalanan ||
        !tanggalBerakhirPerjalanan ||
        !destinasiPerjalanan) {
        return res.status(400).json({
            status: "error",
            message: "Tourist ID, start date, end date, and destination are required",
        });
    }
    if (new Date(tanggalMulaiPerjalanan) >= new Date(tanggalBerakhirPerjalanan)) {
        return res.status(400).json({
            status: "error",
            message: "End date must be after start date",
        });
    }
    next();
};
exports.validateCreateTravel = validateCreateTravel;
const validateLogin = (req, res, next) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({
            status: "error",
            message: "Username and password are required",
        });
    }
    next();
};
exports.validateLogin = validateLogin;
