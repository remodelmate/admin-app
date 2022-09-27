import { dbConnect } from '@utils/mongodb'
import { NextApiRequest, NextApiResponse } from 'next'
import { Estimate } from 'models/estimate'
import { Magic } from '@magic-sdk/admin'

require('models/contractor')
require('models/homeowner')
require('models/milestone')
require('models/receipt')

const magic = new Magic(process.env.MAGIC_SECRET_KEY)

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    await dbConnect()

    const didToken = req.headers.authorization.substr(7)

    try {
      magic.token.validate(didToken)
      const metadata = await magic.users.getMetadataByToken(didToken)

      const email = metadata.email

      if (!email) {
        return res
          .status(500)
          .send({ message: 'No email address from metadata' })
      }

      const estimate = await Estimate.findOne({ _id: req.body.id })
        .populate({
          path: '_homeowner',
          select: 'firstName lastName email phone',
        })
        .populate({
          path: 'contractors',
          select: 'firstName lastName',
        })
        .populate({
          path: 'milestone',
        })
        .populate({
          path: 'receipt',
        })
        .lean()

      res.status(200).json({ ...estimate })
    } catch (error) {
      res.status(500).json({ message: 'Failed to retrieve estimate', error })
      throw new Error(error)
    }
  } else {
    res.setHeader('Allow', 'POST')
    res.status(405).end('Method Not Allowed')
  }
}

export default handler
