import { dbConnect } from '@utils/mongodb'
import { Homeowner } from 'models/homeowner'
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

    const homeownersCountPromise = Homeowner.count(
      filter
        ? {
            $text: { $search: filter },
          }
        : {}
    )

    const homeownersPromise = Homeowner.find(
      filter
        ? {
            $text: { $search: filter },
          }
        : {}
    )
      .sort({ dateCreated: -1 })
      .skip(pageSize * (page - 1))
      .limit(pageSize)

    const [homeownersCount, homeowners] = await Promise.all([
      homeownersCountPromise,
      homeownersPromise,
    ])

    const pageTotal = Math.ceil(homeownersCount / pageSize)

    res.status(200).json({
      homeowners,
      hasMore: homeownersCount > page * pageSize,
      homeownersCount,
      pageTotal,
      pageSize,
    })
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve homeowners', error })
    throw new Error(error)
  }
}

export default handler
