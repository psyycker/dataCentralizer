import mongoose, {Schema, Document, Model} from 'mongoose';

const ProjectPermissionsSchema: Schema = new Schema({
  project: { type: mongoose.Types.ObjectId, required: true, unique: false },
  user: { type: mongoose.Types.ObjectId, required: true, unique: false },
  canEdit: { type: Boolean, required: true },
  canRemoveFiles: { type: Boolean, required: true },
  canView: { type: Boolean, required: true },
  canMoveFiles: { type: Boolean, required: true },
  canCreateFiles: { type: Boolean, required: true },
  canAddUserToProject: { type: Boolean, required: true },
  canRemoveUserFromProject: { type: Boolean, required: true },
})



export interface IProjectPermissionsSchema extends Document {
  project: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId;
  canEdit: boolean;
  canRemoveFiles: boolean;
  canView: boolean;
  canMoveFiles: boolean;
  canCreateFiles: boolean;
  canAddUserToProject: boolean;
  canRemoveUserFromProject: boolean;
}

export interface IProjectPermissionsModel extends Model<IProjectPermissionsSchema> {}

export default mongoose.model<IProjectPermissionsSchema, IProjectPermissionsModel>('ProjectPermissions', ProjectPermissionsSchema);
