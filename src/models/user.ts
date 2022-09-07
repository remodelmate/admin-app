import mongoose, { Document, Schema } from 'mongoose'

// @ts-expect-error hack to fix this in local dev
delete mongoose.connection.models['User'] // prevents `OverwriteModelError`

interface User extends Document {
  [key: string]: any
}

const userSchema = new Schema<User>({
  email: { type: String, required: true },
  issuer: { type: String, required: true, unique: true }, // did:ethr:public_address
  userType: { type: String, required: true },
})

export const User = mongoose.model('User', userSchema)

export default User
