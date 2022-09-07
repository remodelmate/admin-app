import { SigninForm } from '@components/signin-page'
import { magic } from '@utils/magic'
import { RPCError, RPCErrorCode } from 'magic-sdk'
import Image from 'next/image'

const LoginForm = () => {
  const createMagicUser = async (email: string) => {
    try {
      await magic.auth.loginWithMagicLink({ email })

      // TODO: fix small flash transition
      return Promise.resolve(true)
    } catch (err) {
      // TODO: add error handling
      if (err instanceof RPCError) {
        switch (err.code) {
          case RPCErrorCode.AccessDeniedToUser:
          case RPCErrorCode.MagicLinkRateLimited:
          case RPCErrorCode.UserAlreadyLoggedIn:
            // TODO: add error handling
            console.error(err)
            break
        }
      } else {
        console.error(err)
      }
      return Promise.reject(false)
    }
  }

  return (
    <>
      <div className="h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <div className="flex justify-center">
              <Image
                className="mx-auto h-12 w-auto"
                src="https://remodelmate-v2-local.s3.us-east-2.amazonaws.com/branding/logos/wordmark/svg/remodelmate-black.svg"
                alt="Remodelmate logo"
                height={32}
                width={240}
              />
            </div>
            <div>
              <h2 className="mt-10 text-center text-xl font-bold text-gray-900">
                Sign in to your account
              </h2>
            </div>
          </div>

          <SigninForm createMagicUser={createMagicUser} />
        </div>
      </div>
    </>
  )
}

export const LandingPage = () => {
  return <LoginForm />
}
