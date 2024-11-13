import { Request, Response } from "express";
import bcrypt from "bcrypt";
import AppResError from "../../types/extensions/app.res.error";
import { RegisterDTO } from "../../types/DTOs/auth";
import { User } from "../../types/schemas/userSchema";
import { Organization } from "../../types/schemas/organizationSchema";

const register = async (req: Request<any, any, RegisterDTO>, res: Response) => {
    try {
        // Finding Organization:
        let orgName = "";
        req.body.organization !== "IDF" 
            ? orgName = req.body.organization : orgName = `${req.body.organization} - ${req.body.region}`;
        
        const organization = await Organization.findOne({ name: orgName });
        if (!organization) {
            throw new AppResError(404, `${req.body.organization} doesn't exist!`);
        }

        const role = organization.name.startsWith("IDF") ? "IDF" : "Attacker";

        // Creating new User:
        const user = new User({
            username: req.body.username,
            password: await bcrypt.hash(req.body.password, 5),
            role,
            organization: organization._id,
            region: role === "IDF" ? req.body.region : undefined
        });

        // Saving new User:
        await user.save();
        res.status(201).send(`${user.username} registered successfully`);
    } catch (err) {
        const error = err as AppResError;
        res.status(error.statusCode || 500).send(error.message || "Server error");
        console.error(error);
    }
};

export default register;
