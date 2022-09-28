import mongoose, { Document, Schema } from 'mongoose'

// @ts-expect-error hack to fix this in local dev
delete mongoose.connection.models['Receipt'] // prevents `OverwriteModelError`

interface Receipt extends Document {
  [key: string]: any
}

const receiptSchema = new Schema<Receipt>({
  _milestone: {
    type: Schema.Types.ObjectId,
    ref: 'Milestone',
    required: true,
  },

  _project: {
    type: Schema.Types.ObjectId,
    ref: 'Estimate',
    required: true,
  },

  link: {
    type: String,
    required: true,
  },

  dateCreated: {
    type: Date,
    default: Date.now,
  },
})

export const Receipt = mongoose.model('Receipt', receiptSchema)

export default Receipt
