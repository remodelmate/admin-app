import { Magic } from 'magic-sdk'
import { Magic as MagicServer } from '@magic-sdk/admin'
import { NextApiRequest } from 'next'
import { useQuery } from 'react-query'

// creates instance only on client
const createMagic = (key: string) => {
  if (typeof window != 'undefined') {
    const magicInstance = new Magic(key)

    //@ts-expect-error used for testing
    window.magic = magicInstance

    return magicInstance
  }
}

export const magic = createMagic(process.env.NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY)

export const isLoggedIn = async () => {
  try {
    const loggedIn = await magic.user.isLoggedIn()

    return loggedIn
  } catch (e) {
    throw e
  }
}

enum MagicUserCacheKeys {
  isLoggedIn = 'isLoggedIn',
  getMetadata = 'getMetadata',
}

const getIsLoggedIn = () => {
  return magic.user.isLoggedIn()
}

export const useClientIsLoggedIn = () => {
  return useQuery(MagicUserCacheKeys.isLoggedIn, getIsLoggedIn, {
    onSuccess: () => {
      // add logging
    },
    onError: error => {
      // TODO: add error handling
      console.error({ error })
    },
  })
}

export const getUserMetadata = () => {
  return magic.user.getMetadata()
}

export const useClientUserMetadata = ({ enabled }: { enabled: boolean }) => {
  return useQuery(MagicUserCacheKeys.getMetadata, getUserMetadata, {
    onSuccess: () => {
      // add logging
    },
    onError: error => {
      // TODO: add error handling
      console.error({ error })
    },
    enabled,
  })
}

export const getUserToken = async (): Promise<string | null> => {
  try {
    const token = await magic.user.getIdToken({ lifespan: 60 * 60 * 24 * 7 })
    return token
  } catch (error) {
    // TODO: handle errors
    return null
  }
}

export const requiresAuth = async (
  req: NextApiRequest,
  magicInstance: MagicServer
) => {
  try {
    const didToken = req.headers.authorization.substr(7)
    await magicInstance.token.validate(didToken)

    return true
  } catch (error) {
    return false
  }
}

export const verify = async () => {
  const token = await getUserToken()

  return fetch('/api/auth/verify', {
    method: 'GET',
    headers: {
      authorization: `Bearer ${token}`,
    },
  }).then(d => d.json)
}
