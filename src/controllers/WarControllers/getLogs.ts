import { Request, Response } from 'express';
import { AttackLog } from '../../types/schemas/logSchema';
import { Missile } from '../../types/schemas/missileSchema'; 
import { User } from '../../types/schemas/userSchema';
import AppResError from '../../types/extensions/app.res.error';
import getIdFromToken from '../../utils/getId';

const getLogs = async (req: Request, res: Response) => {
    try {
        const token = req.header('Authorization');
        if (!token) throw new AppResError(401, 'Authorization token required');
        
        const userId = getIdFromToken(token);
        const user = await User.findById(userId);
        if (!user) throw new AppResError(404, 'User not found');
        
        let logs = [];

        if (["Hezbollah", "Hamas", "IRGC", "Houthis"].includes(user.organization.name)) {
            logs = await AttackLog.find({ attacker: userId }).exec();

            const logsWithSpeed = await Promise.all(logs.map(async (log) => {
                const missile = await Missile.findOne({ name: log.missileType }).exec();
                const timeToImpact = missile ? missile.speed : 0;  

                return {
                    id: log._id,
                    missileType: log.missileType,
                    targetRegion: log.targetRegion,
                    status: log.status,
                    timeToImpact,
                };
            }));

            res.status(200).json(logsWithSpeed);
        } else if (user.role === 'IDF') {
            logs = await AttackLog.find({ targetRegion: user.region }).exec();

            const logsWithSpeed = await Promise.all(logs.map(async (log) => {
                const missile = await Missile.findOne({ name: log.missileType }).exec();
                const timeToImpact = missile ? missile.speed : 0;  

                return {
                    id: log._id,
                    missileType: log.missileType,
                    targetRegion: log.targetRegion,
                    status: log.status,
                    timeToImpact,  
                };
            }));

            res.status(200).json(logsWithSpeed);
        } else {
            throw new AppResError(400, 'Invalid user role');
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to retrieve logs' });
    }
};

export default getLogs;
