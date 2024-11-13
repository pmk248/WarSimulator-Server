import { Types } from "mongoose"

interface IUser {
    username     : string,
    password     : string,
    role         : "IDF" | "Attacker", 
    organization : Types.ObjectId,
    region?      : "North" | "South" | "Center" | "West Bank" 
}

export default IUser;