import { dbConnect } from '@utils/mongodb'
import { Contractor } from 'models/contractor'
import { NextApiRequest, NextApiResponse } from 'next'
import { Magic } from '@magic-sdk/admin'

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

    const contractorsCountPromise = Contractor.count(
      filter
        ? {
            $text: { $search: filter },
          }
        : {}
    )

    const contractorsPromise = Contractor.find(
      filter
        ? {
            $text: { $search: filter },
          }
        : {}
    )
      .sort({ dateCreated: -1 })
      .skip(pageSize * (page - 1))
      .limit(pageSize)

    const [contractorsCount, contractors] = await Promise.all([
      contractorsCountPromise,
      contractorsPromise,
    ])

    const pageTotal = Math.ceil(contractorsCount / pageSize)

    res.status(200).json({
      contractors,
      hasMore: contractorsCount > page * pageSize,
      contractorsCount,
      pageTotal,
      pageSize,
    })
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve contractors', error })
    throw new Error(error)
  }
}

export default handler
