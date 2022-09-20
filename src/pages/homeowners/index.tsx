import { Homeowners } from '@components/homeowners'
import { Layout } from '@components/layout'
import { Loader } from '@components/shared'
import { getHomeowners, useHomeowners } from '@hooks/homeowners'
import { useClientIsLoggedIn } from '@utils/magic'
import { ROUTE_MAP } from '@utils/routes'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useQueryClient } from 'react-query'

const HomeownersPage = () => {
  const router = useRouter()
  const queryClient = useQueryClient()
  const [page, setPage] = useState(1)

  const {
    data: isLoggedIn,
    error: isLoggedInError,
    isLoading: isLoggedInLoading,
  } = useClientIsLoggedIn()

  const {
    data: homeownersData,
    error: homeownersError,
    isLoading: homeownersIsLoading,
    isPreviousData: homeownersIsPreviousData,
  } = useHomeowners(page, { keepPreviousData: true, staleTime: 5000 })

  useEffect(() => {
    if (homeownersData?.hasMore) {
      queryClient.prefetchQuery(['homeowners', page + 1], () =>
        getHomeowners(page + 1)
      )
    }
  }, [homeownersData, page, queryClient])

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

  return (
    <Homeowners
      homeownersData={homeownersData}
      page={page}
      setPage={setPage}
      homeownersIsPreviousData={homeownersIsPreviousData}
    />
  )
}

HomeownersPage.getLayout = (page: any) => {
  return <Layout>{page}</Layout>
}

export default HomeownersPage
