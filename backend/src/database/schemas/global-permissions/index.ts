import mongoose, { Schema, Document, Model } from 'mongoose'

const GlobalPermissionsSchema: Schema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, unique: true },
  canAdmin: { type: Boolean, required: true }
})

export interface IGlobalPermissionsSchema extends Document {
  userId: mongoose.Schema.Types.ObjectId;
  canAdmin: boolean
}

export interface IGlobalPermissionModel extends Model<IGlobalPermissionsSchema> {}

export default mongoose.model<IGlobalPermissionsSchema, IGlobalPermissionModel>('GlobalPermission', GlobalPermissionsSchema)
