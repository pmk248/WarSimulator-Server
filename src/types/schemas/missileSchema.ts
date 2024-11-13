import { model, Schema } from "mongoose";
import IMissile from "../models/IMissile";


interface missileDocument extends IMissile, Document {}

const missileSchema = new Schema<missileDocument>({
    name: { 
        type     : String, 
        required : true, 
        unique   : true 
    },
    description: { 
        type     : String, 
        required : true 
    },
    speed: { 
        type     : Number, 
        required : true 
    },
    intercepts: [
        { 
            type : String 
        }
    ],  
    price: { 
        type     : Number, 
        required : true }
});

export const Missile = model("Missile", missileSchema);
