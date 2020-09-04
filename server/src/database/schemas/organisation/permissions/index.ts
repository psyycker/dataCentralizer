import mongoose, {Schema, Document, Model} from 'mongoose';

const OrganisationPermissionsSchema: Schema = new Schema({
  organisation: { type: mongoose.Schema.Types.ObjectId, required: true, unique: false },
  user: { type: mongoose.Schema.Types.ObjectId, required: true, unique: false },
  owner: { type: Boolean, required: true },
  canAddAdmins: { type: Boolean, required: true },
  canRemoveAdmins: { type: Boolean, required: true },
})

export interface IOrganisationPermissionsSchema extends Document {
  organisation: mongoose.Schema.Types.ObjectId;
  user: mongoose.Schema.Types.ObjectId;
  owner: boolean;
  canAddAdmins: boolean;
  canRemoveAdmins: boolean;
}

export interface IOrganisationPermissionsModel extends Model<IOrganisationPermissionsSchema> {}

export default mongoose.model<IOrganisationPermissionsSchema, IOrganisationPermissionsModel>('OrganisationPermissions', OrganisationPermissionsSchema);
