import { Request, Response } from 'express';
import { User } from '../../types/schemas/userSchema';
import getIdFromToken from '../../utils/getId';
import AppResError from '../../types/extensions/app.res.error';

const getUserResources = async (req: Request, res: Response) => {
    try {

        const token = req.header('Authorization');
        const userId = getIdFromToken(token!);
        const user = await User.findById(userId!).populate('organization.resources');
        res.json({ resources: user!.organization.resources });

    } catch (err) {
        console.error(err);
        throw new AppResError(500, 'Error fetching resources');
    }
};

export default getUserResources;