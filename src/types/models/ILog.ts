import { Types } from "mongoose";

export interface IInterceptionAttempt {
    defender            : Types.ObjectId;
    interceptorType     : string;
    interceptionSuccess : boolean;
}

interface ILog {
    attacker             : Types.ObjectId;
    targetRegion         : "North" | "South" | "Center" | "West Bank";
    missileType          : string;
    status               : "pending" | "hit" | "miss";
    interceptionAttempt? : IInterceptionAttempt;
    timestamp            : Date;
}

export default ILog;