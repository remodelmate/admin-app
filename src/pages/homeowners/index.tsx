import { Homeowners } from '@components/homeowners'
import { Layout } from '@components/layout'
import { Loader } from '@components/shared'
import { useHomeowners } from '@hooks/homeowners'
import { useClientIsLoggedIn } from '@utils/magic'
import { ROUTE_MAP } from '@utils/routes'
import { useRouter } from 'next/router'

const HomeownersPage = () => {
  const router = useRouter()

  const {
    data: isLoggedIn,
    error: isLoggedInError,
    isLoading: isLoggedInLoading,
  } = useClientIsLoggedIn()

  const {
    data: homeownersData,
    error: homeownersError,
    isLoading: homeownersIsLoading,
  } = useHomeowners()

  if (isLoggedInLoading || homeownersIsLoading) {
    return <Loader />
  }

  if (isLoggedInError || homeownersError) {
    return <div>There was an error</div>
  }

  if (!isLoggedIn) {
    router.push(ROUTE_MAP.app.entry)
    return <></>
  }

  return <Homeowners homeowners={homeownersData} />
}

HomeownersPage.getLayout = (page: any) => {
  return <Layout>{page}</Layout>
}

export default HomeownersPage
