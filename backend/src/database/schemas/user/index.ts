import mongoose, { Schema, Document, Model } from 'mongoose'

const UserSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true, unique: false },
  passwordSalt: { type: String, required: true, unique: false },
  tokenSalt: { type: String, required: true, unique: false },
  token: { type: String, required: false, unique: false },
  firstName: { type: String, required: false, unique: false },
  lastName: { type: String, required: false, unique: false }
})

export interface IUserSchema extends Document {
  email: string;
  password: string;
  passwordSalt: string;
  tokenSalt: string;
  firstName?: string;
  lastName?: string;
  token: string;
}

export interface IUserModel extends Model<IUserSchema> {}

export default mongoose.model<IUserSchema, IUserModel>('User', UserSchema)
