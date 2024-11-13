import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import IToken from '../types/models/IToken';
import AppResError from '../types/extensions/app.res.error';

export function decodeToken(token: string): IToken | null {
  try {
    return jwt.verify(token, process.env.JWT_SECRET!) as IToken;
  } catch (error) {
    return null;
  }
}

export function allowIDF(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(' ')[1];
    const user = token ? decodeToken(token) : null;
  
    if (!user || user.role !== 'IDF') {
        throw new AppResError(403,'Access restricted to IDF personnel only');
    }
    next();
}
  
export function allowAttacker(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(' ')[1];
    const user = token ? decodeToken(token) : null;
  
    if (!user || user.role !== 'Attacker') {
        throw new AppResError(403, 'Access restricted to attackers only');
    }
    next();
}
  