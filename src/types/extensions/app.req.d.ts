import { Request } from "express";
import { IToken } from "../models/IToken";

declare module 'express' {
    interface Request {
        token? : IToken
    }
}