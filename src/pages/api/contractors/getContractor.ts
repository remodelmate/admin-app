import { dbConnect } from '@utils/mongodb'
import { NextApiRequest, NextApiResponse } from 'next'
import { Contractor } from 'models/contractor'
import { Magic } from '@magic-sdk/admin'

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

      const contractor = await Contractor.findOne({ _id: req.body.id })
        .populate({
          path: 'projects',
          select: 'address activated completed totalCost dateCreated',
          options: { sort: { dateCreated: -1 } },
        })
        .lean()

      res.status(200).json({ ...contractor })
    } catch (error) {
      res.status(500).json({ message: 'Failed to retrieve contractor', error })
      throw new Error(error)
    }
  } else {
    res.setHeader('Allow', 'POST')
    res.status(405).end('Method Not Allowed')
  }
}

export default handler
