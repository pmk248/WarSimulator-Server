import { model, Schema } from "mongoose";
import ILog from "../models/ILog";

interface logDocument extends ILog, Document {}

const attackLogSchema = new Schema<logDocument>({
    attacker: { 
        type : Schema.Types.ObjectId, 
        ref  : "User" 
    },
    targetRegion: { 
        type : String, 
        enum : ["North", "South", "Center", "West Bank"] 
    },
    missileType: { 
        type : String, 
        ref  : "Missile" 
    },
    status: { 
        type     : String, 
        enum     : ["hit", "miss"], 
        required : true 
    },
    interceptionAttempt: {
        defender            : { type: Schema.Types.ObjectId, ref: "User" },
        interceptorType     : { type: String, ref: "Missile" },
        interceptionSuccess : { type: Boolean }
    },
    timestamp: { 
        type    : Date, 
        default : Date.now 
    }
});

export const AttackLog = model("AttackLog", attackLogSchema);
