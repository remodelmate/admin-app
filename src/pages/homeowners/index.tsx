import { Homeowners } from '@components/homeowners'
import { Layout } from '@components/layout'
import { Loader } from '@components/shared'
import { getHomeowners, useHomeowners } from '@hooks/homeowners'
import { useClientIsLoggedIn } from '@utils/magic'
import { ROUTE_MAP } from '@utils/routes'
import { useRouter } from 'next/router'
import { ReactNode, useEffect, useState } from 'react'
import { useQueryClient } from 'react-query'

const HomeownersPage = () => {
  const router = useRouter()
  const queryClient = useQueryClient()
  const [page, setPage] = useState(1)
  const [filter, setFilter] = useState('')

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
  } = useHomeowners(page, filter, { keepPreviousData: true, staleTime: 5000 })

  useEffect(() => {
    if (homeownersData?.hasMore) {
      queryClient.prefetchQuery(['homeowners', page + 1, filter], () =>
        getHomeowners(page + 1, filter)
      )
    }
  }, [homeownersData, page, queryClient, filter])

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
      setFilter={setFilter}
    />
  )
}

HomeownersPage.getLayout = (page: ReactNode) => {
  return <Layout>{page}</Layout>
}

export default HomeownersPage
