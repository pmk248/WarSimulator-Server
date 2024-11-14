import { UserRole } from "../enum";

interface IUser {
    username     : string,
    password     : string,
    role         : UserRole, 
    organization : {
        name     : string,
        resources: { name: string; amount: number }[],
        budget   : number
    },
    region?      : "North" | "South" | "Center" | "West Bank",
}

export default IUser;