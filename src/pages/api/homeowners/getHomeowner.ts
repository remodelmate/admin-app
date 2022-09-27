import { dbConnect } from '@utils/mongodb'
import { NextApiRequest, NextApiResponse } from 'next'
import { Homeowner } from 'models/homeowner'
import { Magic } from '@magic-sdk/admin'
require('models/estimate')

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

      const homeowner = await Homeowner.findOne({ _id: req.body.id })
        .populate({
          path: 'estimates',
          select: 'address activated completed totalCost dateCreated',
          options: { sort: { dateCreated: -1 } },
        })
        .lean()

      res.status(200).json({ ...homeowner })
    } catch (error) {
      res.status(500).json({ message: 'Failed to retrieve homeowner', error })
      throw new Error(error)
    }
  } else {
    res.setHeader('Allow', 'POST')
    res.status(405).end('Method Not Allowed')
  }
}

export default handler
