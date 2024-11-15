import { connect } from "mongoose"
import { seedData } from "./seed";
import { Organization } from "../types/schemas/organizationSchema";
import { Missile } from "../types/schemas/missileSchema";

export const dbConnection = async () => {
    try {
        await connect(process.env.CONNECTION_STR!);

        const missileCount = await Missile.countDocuments();
        const organizationCount = await Organization.countDocuments();

        if (!missileCount && !organizationCount) {
            await seedData();
            console.log("Seeded successfully!");
        }

        console.log("successfully connected to mongoDB");
    } catch(err) {
        console.error((err as Error).message);
    }
}