import { Request, Response, NextFunction } from "express";
import ErrorHandler from "../utils/ErrorHandler"
module.exports = (err: any, req: Request, res: Response, next: NextFunction) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || 'Internal server error'
    // wrong mongdb id error
    if (err.name === 'CastError') {
        const message = `Resource Not Found. Invalid ${err.path}`;
        const updatedError = new ErrorHandler(message, 400);
        err = updatedError;
    }
    // duplicate key error 
    if (err.code === 11000 || (err.code && err.code === 11000)) {
        // Handle the duplicate key error here
        const message = `Duplicate key ${Object.keys(err.keyValue)} entered`;
        const updatedError = new ErrorHandler(message, 400);
        err = updatedError;
    }

    if (err.name === 'jsonWebTokenError') {
        const message = `jsonwebtoken is invalid , try again`;
        const updatedError = new ErrorHandler(message, 400);
        err = updatedError;
    }
    if (err.name === 'TokenExpireError') {
        const message = `jsonwebtoken expired ,try again`;
        const updatedError = new ErrorHandler(message, 400);
        err = updatedError;
    }
    res.status(err.statusCode).json({
        success: false,
        message:err.message
    })
}