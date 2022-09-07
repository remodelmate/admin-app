interface CheckRequest {
  email: string
}

export const checkUserExists = async ({ email }: CheckRequest) => {
  const body = JSON.stringify({ email })

  try {
    const res = await fetch('/api/auth/check', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: body,
    })

    const userExists = await res.json()

    console.log({ res: userExists.success })

    return userExists.success
  } catch (error) {
    return false
  }
}
