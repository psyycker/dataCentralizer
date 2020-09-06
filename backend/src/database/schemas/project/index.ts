import mongoose, { Schema, Document, Model } from 'mongoose'

const ProjectSchema: Schema = new Schema({
  organisation: { type: mongoose.Types.ObjectId, required: true, unique: false },
  name: { type: String, required: true }
})

export interface IProjectSchema extends Document {
  organisation: mongoose.Types.ObjectId;
  name: string
}

export interface IProjectModel extends Model<IProjectSchema> {}

export default mongoose.model<IProjectSchema, IProjectModel>('Project', ProjectSchema)
