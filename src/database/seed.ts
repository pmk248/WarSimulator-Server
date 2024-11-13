import fs from "fs";
import { Organization } from "../types/schemas/organizationSchema";
import { Missile } from "../types/schemas/missileSchema";

export const seedData = async () => {
    
    const organizationData = JSON.parse(fs.readFileSync("./src/database/JSONs/organizations.json", "utf-8"));
    const missileData = JSON.parse(fs.readFileSync("./src/database/JSONs/missiles.json", "utf-8"));
    
    await Organization.deleteMany({});
    await Missile.deleteMany({});
    
    await Organization.insertMany(organizationData);
    await Missile.insertMany(missileData);
    
};

seedData().catch(err => console.error("Error loading data:", err));
