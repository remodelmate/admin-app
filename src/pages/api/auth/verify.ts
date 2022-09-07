import { Magic } from '@magic-sdk/admin'
import { requiresAuth } from '@utils/magic'
import { NextApiRequest, NextApiResponse } from 'next'

// Initiating Magic instance for server-side methods
const magic = new Magic(process.env.MAGIC_SECRET_KEY)

const verify = async (req: NextApiRequest, res: NextApiResponse) => {
  const isAuthenticated = await requiresAuth(req, magic)

  return isAuthenticated
    ? res.status(200).json({ authenticated: true })
    : res
        .status(400)
        .json({ authenticated: false, error: 'You must be logged in' })
}

export default verify
