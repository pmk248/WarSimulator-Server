import { Request, Response } from "express";
import { io } from "../../app"; 
import { decodeToken } from "../../middleware/roleMiddleware";
import AppResError from "../../types/extensions/app.res.error";
import IToken from "../../types/models/IToken";
import { User } from "../../types/schemas/userSchema";
import { AttackLog } from "../../types/schemas/logSchema";
import attackDto from "../../types/DTOs/attackDto";

// Attack Endpoint
const attack = async (req: Request<any, any, attackDto>, res: Response) => {
    try {
        const { targetRegion, weaponType, username } = req.body;

        const user = await User.findOne({ username: username});
        if (!user) throw new AppResError(404, "User not found!")

        const log = new AttackLog({
            attacker      : user.id,
            targetRegion,
            missileType   : weaponType,
            status        : "pending",  
            timestamp     : new Date(),
        })
        io.of('/defense').emit("incoming_attack", { log });
        await log.save();

        res.status(200).json({ message: "Attack launched successfully" });
    } catch (err) {
        res.status(500).json({ message: "Failed to launch attack" });
        console.error(err);
    }
};

export default attack;

