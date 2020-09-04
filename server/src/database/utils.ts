import mongoose from "mongoose";

export function stringToObjectID(idStr: any): mongoose.Types.ObjectId {
  return mongoose.Types.ObjectId(idStr.toString());
}
