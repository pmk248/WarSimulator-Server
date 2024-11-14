import { Request, Response, NextFunction } from 'express';
import AppResError from '../types/extensions/app.res.error';
import getIdFromToken from '../utils/getId';
import { User } from "../types/schemas/userSchema";


export async function allowIDF(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization;
    if (!token) throw new AppResError(301, "Login!");
    const id = getIdFromToken(token);
    const user = await User.findById(id);
    if (!user) throw new AppResError(404, "can't find user!")
    if (user.role !== 'IDF') {
        throw new AppResError(403, 'Access restricted to attackers only');
    }
    next();
}

export async function allowAttacker(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization;
    if (!token) throw new AppResError(301, "Login!");
    const id = getIdFromToken(token);
    const user = await User.findById(id);
    if (!user) throw new AppResError(404, "can't find user!")
    if (!["Hezbollah", "Hamas", "IRGC", "Houthis"].includes(user.organization.name)) {
        throw new AppResError(403, 'Access restricted to attackers only');
    }
    next();
}
