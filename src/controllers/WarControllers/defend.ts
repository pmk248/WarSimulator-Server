import { Request, Response } from "express";
import { io } from "../../app"; 
import AppResError from "../../types/extensions/app.res.error";
import { User } from "../../types/schemas/userSchema";
import { AttackLog } from "../../types/schemas/logSchema";
import getIdFromToken from "../../utils/getId";
import defenseDto from "../../types/DTOs/defenseDto";
import { Missile } from "../../types/schemas/missileSchema";

const defend = async (req: Request<any, any, defenseDto>, res: Response) => {
    try {
        const { attackId, interceptorType } = req.body;
        const token = req.header("Authorization");
        const id = getIdFromToken(token!);

        const defender = await User.findById(id);
        if (!defender) throw new AppResError(404, "Log in!");

        const attack = await AttackLog.findById(attackId).populate("attacker", "organization");
        if (!attack) throw new AppResError(404, "No Attack found!");

        const enemyMissile = await Missile.findOne({ name: attack.missileType });
        if (!enemyMissile) throw new AppResError(404, "Missile type not found!");

        if (attack.status !== "pending") throw new AppResError(404, "You missed the time window!");
         

        const interceptor = defender.organization.resources.find(w => w.name === interceptorType);
        if (!interceptor || interceptor.amount <= 0) {
            throw new AppResError(404, "You do not have this weapon!");
        }
        interceptor.amount -= 1;
        await defender.save();
        let interceptionSuccess = false;
        interceptionSuccess = Math.random() < 0.7; 
        attack.status = interceptionSuccess ? "miss" : "pending";

        io.of('/attack').emit("interception_result", { attackId: attack._id, status: attack.status });
        res.status(200).json({ message: "Defense action taken successfully", status: attack.status });
        await attack.save();
    } catch (err) {
        res.status(500).json({ message: "Failed to defend" });
        console.error(err);
    }
};


export default defend;