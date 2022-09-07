import { dbConnect } from '@utils/mongodb'
import { NextApiRequest, NextApiResponse } from 'next'
import { User } from 'models/user'

type NextApiRequestWithEmail = Omit<NextApiRequest, 'body'> & {
  body: {
    email: string
  }
}

const handler = async (req: NextApiRequestWithEmail, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { email } = req.body

    if (!req.body.email) {
      res.status(400).json({ message: 'Missing email value' })
    }

    await dbConnect()

    try {
      const user = await User.findOne({ email }).lean()

      if (user) {
        res.status(200).json({ success: true })
      } else {
        res.status(400).json({ success: false })
      }
    } catch (error) {
      res.status(500).json({ message: 'failed' })
      throw new Error(error)
    }
  } else {
    res.setHeader('Allow', 'GET')
    res.status(405).end('Method Not Allowed')
  }
}

export default handler
