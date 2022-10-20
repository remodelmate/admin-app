import mongoose, { Document, Schema } from 'mongoose'
import validator from 'validator'

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
delete mongoose.connection.models['Homeowner'] // prevents `OverwriteModelError`

interface Homeowner extends Document {
  [key: string]: any
}

const homeownerSchema = new Schema<Homeowner>({
  firstName: { type: String, required: true, trim: true },
  lastName: {
    type: String,
    required: true,
    trim: true,
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
  },

  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    validate(value: string) {
      if (!validator.isEmail(value)) {
        throw new Error(`${value} is an invalid email`)
      }
    },
  },

  phone: {
    type: String,
    validate(value: string) {
      if (!validator.isMobilePhone(value)) {
        throw new Error(`${value} is not a valid 10 digit number!`)
      }
    },
  },

  stripeCustomerId: {
    type: String,
  },

  estimates: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Estimate',
    },
  ],

  dateCreated: {
    type: Date,
    default: Date.now,
  },
})

homeownerSchema.index({
  firstName: 'text',
  lastName: 'text',
  email: 'text',
})

export const Homeowner = mongoose.model('Homeowner', homeownerSchema)

export default Homeowner
