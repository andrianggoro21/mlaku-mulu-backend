"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFoundHandler = exports.errorHandler = void 0;
const errorHandler = (error, req, res, next) => {
    console.error("Error:", error);
    if (res.headersSent) {
        return next(error);
    }
    return res.status(500).json({
        status: "error",
        message: error.message,
    });
};
exports.errorHandler = errorHandler;
const notFoundHandler = (req, res) => {
    return res.status(404).json({
        status: "error",
        message: "Route not found",
    });
};
exports.notFoundHandler = notFoundHandler;
