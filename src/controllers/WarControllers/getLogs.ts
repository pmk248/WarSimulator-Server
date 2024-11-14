import { Request, Response } from 'express';
import { AttackLog } from '../../types/schemas/logSchema';
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
        
        let logs: Array<AttackLog | undefined> = [];

        if (["Hezbollah", "Hamas", "IRGC", "Houthis"].includes(user.organization.name)) {
            // Fetch logs where the user was the attacker
            logs = await AttackLog.find({ attacker: userId });

            // Send proper JSON response
            res.status(200).json(logs.map(log => ({
                id: log._id,
                missileType: log.missileType,
                targetRegion: log.targetRegion,
                status: log.status,
                timeToImpact: log.timeToImpact
            })));
        } else if (user.role === 'IDF') {
            // Fetch logs where the user was the defender
            logs = await AttackLog.find({ targetRegion: user.region });

            // Send proper JSON response
            res.status(200).json(logs.map(log => ({
                id: log._id,
                missileType: log.missileType,
                targetRegion: log.targetRegion,
                status: log.status,
                timeToImpact: log.timeToImpact
            })));
        } else {
            throw new AppResError(400, 'Invalid user role');
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to retrieve logs' });
    }
};

export default getLogs;
