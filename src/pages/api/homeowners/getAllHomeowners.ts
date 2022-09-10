import { dbConnect } from '@utils/mongodb'
import { Homeowner } from 'models/homeowners'
import { NextApiRequest, NextApiResponse } from 'next'
import { Magic } from '@magic-sdk/admin'

const magic = new Magic(process.env.MAGIC_SECRET_KEY)

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await dbConnect()

  const didToken = req.headers.authorization.substr(7)

  try {
    magic.token.validate(didToken)
    const metadata = await magic.users.getMetadataByToken(didToken)

    const email = metadata.email

    if (!email) {
      return res.status(500).send({ message: 'No email address from metadata' })
    }

    const filter = {}
    const homeowners = await Homeowner.find(filter).sort({ dateCreated: -1 })

    res.status(200).json({ ...homeowners })
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve homeowners', error })
    throw new Error(error)
  }
}

export default handler
