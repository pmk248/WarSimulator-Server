import { Types } from "mongoose"

interface IUser {
    username     : string,
    password     : string,
    role         : string, 
    organization : {
        name     : string,
        resources: { name: string; amount: number }[],
        budget   : number
    },
    region?      : "North" | "South" | "Center" | "West Bank",
}

export default IUser;