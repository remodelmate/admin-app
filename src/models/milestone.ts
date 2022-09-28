import mongoose, { Document, Schema } from 'mongoose'

// @ts-expect-error hack to fix this in local dev
delete mongoose.connection.models['Milestone'] // prevents `OverwriteModelError`

interface Milestone extends Document {
  [key: string]: any
}

const milestoneSchema = new Schema<Milestone>({
  _project: {
    type: Schema.Types.ObjectId,
    ref: 'Estimate',
    required: true,
  },

  _category: {
    type: String,
    required: true,
  },

  _contractor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Contractor',
  },

  name: {
    type: String,
    minlength: 2,
    maxlength: 80,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  price: {
    type: Number,
    min: 0,
    required: true,
  },

  contractorPercentage: {
    type: Number,
    min: 0,
    required: true,
  },

  status: {
    type: String,
    required: true,
    default: 'notStarted',
  },

  receipt: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Receipt',
  },

  images: [
    {
      type: String,
    },
  ],

  notes: {
    type: String,
    maxlength: 700,
  },
})

export const Milestone = mongoose.model('Milestone', milestoneSchema)

export default Milestone
