import mongoose, { Document, Schema } from 'mongoose'

// TODO: MOVE THIS OUT INTO A UTILITIES FOLDER OR SOMETHING
const statesArray = [
  'AL',
  'AK',
  'AZ',
  'AR',
  'CA',
  'CO',
  'CT',
  'DC',
  'DE',
  'FL',
  'GA',
  'HI',
  'ID',
  'IL',
  'IN',
  'IA',
  'KS',
  'KY',
  'LA',
  'ME',
  'MD',
  'MA',
  'MI',
  'MN',
  'MS',
  'MO',
  'MT',
  'NE',
  'NV',
  'NH',
  'NJ',
  'NM',
  'NY',
  'NC',
  'ND',
  'OH',
  'OK',
  'OR',
  'PA',
  'RI',
  'SC',
  'SD',
  'TN',
  'TX',
  'UT',
  'VT',
  'VA',
  'WA',
  'WV',
  'WI',
  'WY',
]

// @ts-expect-error hack to fix this in local dev
delete mongoose.connection.models['Estimate'] // prevents `OverwriteModelError`

interface Estimate extends Document {
  [key: string]: any
}

const estimateSchema = new Schema<Estimate>({
  _homeowner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Homeowner',
  },

  _contractor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Contractor',
  },

  collectionName: {
    type: String,
  },

  layout: {
    type: String,
  },

  address: {
    street: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      uppercase: true,
      required: true,
      enum: statesArray,
    },
    zip: {
      type: Number,
      required: true,
    },
    place_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    additional: {
      type: String,
      trim: true,
    },
  },

  milestones: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Milestone',
      required: true,
    },
  ],

  contractors: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Contractor',
    },
  ],

  receipts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Receipt',
    },
  ],

  activated: {
    type: Boolean,
    required: true,
    default: false,
  },

  completed: {
    type: Boolean,
    required: true,
    default: false,
  },

  totalCost: {
    type: Number,
    required: true,
  },

  remainingBalance: {
    type: Number,
    required: true,
  },

  dateCreated: {
    type: Date,
    default: Date.now,
  },
})

export const Estimate = mongoose.model('Estimate', estimateSchema)

export default Estimate
