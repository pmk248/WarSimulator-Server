import { Types } from "mongoose";

interface IToken {
    id      : Types.ObjectId,
    isAdmin : boolean
}

export default IToken;