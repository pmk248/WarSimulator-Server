import jwt from "jsonwebtoken";
import IToken from "../types/models/IToken";

const getIdFromToken = (token: string): Object | null => {
    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY!) as IToken;
        return decoded.id;
    } catch (error) {
        console.error("Invalid token:", error);
        return null;
    }
};

export default getIdFromToken;
