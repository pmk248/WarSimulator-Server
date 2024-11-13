import { Region, UserRole } from "./enum";

export type RegisterDTO = {
    username     : string;
    password     : string;
    organization : UserRole;  
    region?      : Region;         
}

export type LoginDTO = {
    username : string;
    password : string;
}
