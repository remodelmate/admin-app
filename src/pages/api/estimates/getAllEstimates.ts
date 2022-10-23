import { dbConnect } from '@utils/mongodb'
import { Estimate } from 'models/estimate'
import { NextApiRequest, NextApiResponse } from 'next'
import { Magic } from '@magic-sdk/admin'
require('models/homeowner')
require('models/contractor')

const magic = new Magic(process.env.MAGIC_SECRET_KEY)

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await dbConnect()

  const didToken = req.headers.authorization.substr(7)

  const page = Number(req.query.page) || 1
  const pageSize = 20

  const { filter } = req.body

  try {
    magic.token.validate(didToken)
    const metadata = await magic.users.getMetadataByToken(didToken)

    const email = metadata.email

    if (!email) {
      return res.status(500).send({ message: 'No email address from metadata' })
    }

    const estimatesCountPromise = Estimate.count(
      filter
        ? {
            $or: [
              { 'address.street': { $regex: filter, $options: 'i' } },
              { 'address.state': { $regex: filter, $options: 'i' } },
              { 'address.city': { $regex: filter, $options: 'i' } },
            ],
          }
        : {}
    )

    const estimatesPromise = Estimate.find(
      filter
        ? {
            $or: [
              { 'address.street': { $regex: filter, $options: 'i' } },
              { 'address.state': { $regex: filter, $options: 'i' } },
              { 'address.city': { $regex: filter, $options: 'i' } },
            ],
          }
        : {}
    )
      .populate({
        path: '_homeowner',
        select: 'firstName lastName',
      })
      .populate({
        path: 'contractors',
        select: 'firstName lastName',
      })
      .sort({ dateCreated: -1 })
      .skip(pageSize * (page - 1))
      .limit(pageSize)

    const [estimatesCount, estimates] = await Promise.all([
      estimatesCountPromise,
      estimatesPromise,
    ])

    const pageTotal = Math.ceil(estimatesCount / pageSize)

    res.status(200).json({
      estimates,
      hasMore: estimatesCount > page * pageSize,
      estimatesCount,
      pageTotal,
      pageSize,
    })
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve estimates', error })
    throw new Error(error)
  }
}

export default handler
