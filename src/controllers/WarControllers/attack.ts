import { Request, Response } from "express";
import { io } from "../../app"; 
import AppResError from "../../types/extensions/app.res.error";
import { User } from "../../types/schemas/userSchema";
import { AttackLog } from "../../types/schemas/logSchema";
import attackDto from "../../types/DTOs/attackDto";
import { Missile } from "../../types/schemas/missileSchema";
import getIdFromToken from "../../utils/getId";

const attack = async (req: Request<any, any, attackDto>, res: Response) => {
    try {
        const { targetRegion, missileType } = req.body;
        const token = req.header("Authorization");
        const id = getIdFromToken(token!);
        const user = await User.findById(id);
        if (!user) throw new AppResError(404, "User not found!")
        
        const missile = await Missile.findOne({ name: missileType });
        if (!missile) throw new AppResError(404, "weapon not found!");
        const speed = missile.speed;

        const attackLog = new AttackLog({
            attacker      : user.id,
            targetRegion,
            missileType,
            status        : "pending"
        })
        
        io.of('/defense').emit("incoming_attack", { attackLog });
        let inventory = await user.organization.resources.find(w => w.name === missileType);
        if (!inventory || inventory.amount <= 0 ) throw new AppResError(404, "you do not have this weapon!");
        inventory.amount -= 1;
        await user.save();
        await attackLog.save();

        res.status(200).json({ message: "Attack launched successfully" });
        setTimeout(() => {
            if (attackLog.status !== "pending"){
                attackLog.status = "hit";
                attackLog.save();
                return;
            }}, speed * 1000);
    } catch (err) {
        res.status(500).json({ message: "Failed to launch attack" });
        console.error(err);
    }
};

export default attack;

