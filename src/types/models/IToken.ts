import { Types } from "mongoose";

interface IToken {
    id   : Types.ObjectId,
    role : "IDF" | "Attacker"
}

export default IToken;