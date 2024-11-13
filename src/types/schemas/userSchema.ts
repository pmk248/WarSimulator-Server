import { Schema, model } from "mongoose";
import IUser from "../models/IUser";

interface userDocument extends IUser, Document {}

const userSchema = new Schema<userDocument>({
    username: {
        type     : String, 
        required : true, 
        unique   : true 
    },
    password: { 
        type     : String, 
        required : true 
    },
    role: { 
        type     : String, 
        enum     : ["IDF", "Attacker"], 
        required : true 
    },
    organization: { 
        type     : Schema.Types.ObjectId, 
        ref      : "Organization",
        required : true
    },
    region: { 
        type : String, 
        enum : ["North", "South", "Center", "West Bank"] 
    }
}, { timestamps: true });

export const User = model("User", userSchema);
