/// <reference path="../types/extensions/app.req.d.ts"/>

import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import IToken from "../types/models/IToken";
import AppResError from "../types/extensions/app.res.error";


export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  try {

    const token = req.header("Authorization"); 
    if (!token) throw new AppResError(401, "Login first");

    const decoded = jwt.verify(token, process.env.SECRET_KEY!) as IToken;
    req.token = decoded; 

    next();
  } catch (err) {
    const error = err as AppResError;
    res.status(error.statusCode || 500).send(error.message);
  }
};
