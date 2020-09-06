import mongoose, { Schema, Document, Model } from 'mongoose'

const OrganisationSchema: Schema = new Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, required: true, unique: false },
  name: { type: String, required: true, unique: false }
})

export interface IOrganisationSchema extends Document {
  owner: mongoose.Schema.Types.ObjectId;
  name: string;
}

export interface IOrganisationModel extends Model<IOrganisationSchema> {}

export default mongoose.model<IOrganisationSchema, IOrganisationModel>('Organisation', OrganisationSchema)
