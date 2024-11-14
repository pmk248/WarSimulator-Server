import { Request, Response } from "express";
import AppResError from "../../types/extensions/app.res.error";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { LoginDTO } from "../../types/DTOs/auth";
import { User } from "../../types/schemas/userSchema";
import { Organization } from "../../types/schemas/organizationSchema";

const login = async (req: Request<any, any, LoginDTO>, res: Response) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        if (!user) {
        throw new AppResError(404, `${req.body.username} not found!`);
        }

        if (!await bcrypt.compare(req.body.password, user.password)) {
        throw new AppResError(404, "Incorrect details!");
        }

        const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY!, {
        expiresIn: "4h"
        });

        res.setHeader("Authorization", token);
        res.status(200).json({
            token,
            user: {
                id: user.id,
                username: user.username,
                role: user.role,
                resources: user.organization.resources
            }
        });
    } catch (err) {
        const error = err as AppResError;
        res.status(error.statusCode || 500).send(error.message);
        console.error(error);
    }
};

export default login;
