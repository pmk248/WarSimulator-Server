import { Schema, model } from "mongoose";
import IOrganization from "../models/IOrganization";

interface organizationDocument extends IOrganization, Document {}

const organizationSchema = new Schema<organizationDocument>({
    name: { 
        type     : String, 
        required : true, 
        unique   : true },
    resources: [
        {
            name: { 
                type     : String, 
                required : true 
            },
            amount: { 
                type     : Number, 
                required : true 
            }
        }
    ],
    budget: { 
        type: Number, 
        required: true 
    }
});

export const Organization = model("Organization", organizationSchema);
