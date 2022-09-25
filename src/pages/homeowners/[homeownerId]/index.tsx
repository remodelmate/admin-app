import { useRouter } from 'next/router'
import { useClientIsLoggedIn } from '@utils/magic'
import { HomeownerDetail } from '@components/homeowners'
import { Layout } from '@components/layout'
import { Loader } from '@components/shared'
import { useHomeowner } from '@hooks/homeowners'
import { ROUTE_MAP } from '@utils/routes'

const HomeownerPage = () => {
  const router = useRouter()
  const { homeownerId } = router.query

  const {
    data: isLoggedIn,
    error: isLoggedInError,
    isLoading: isLoggedInLoading,
  } = useClientIsLoggedIn()

  const {
    data: homeownerData,
    error: homeownerError,
    isLoading: homeownerIsLoading,
  } = useHomeowner(homeownerId as string, { enabled: !!homeownerId })

  if (isLoggedInLoading || homeownerIsLoading) {
    return <Loader />
  }

  if (isLoggedInError || homeownerError) {
    return <div>There was an error. Try closing browser and log back in.</div>
  }

  if (!isLoggedIn) {
    router.push(ROUTE_MAP.app.entry)
    return <></>
  }

  return <HomeownerDetail homeowner={homeownerData} />
}

HomeownerPage.getLayout = (page: any) => {
  return <Layout>{page}</Layout>
}

export default HomeownerPage
