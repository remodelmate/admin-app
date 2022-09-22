import { Estimates } from '@components/estimates'
import { Layout } from '@components/layout'
import { Loader } from '@components/shared'
import { getEstimates, useEstimates } from '@hooks/estimates'
import { useClientIsLoggedIn } from '@utils/magic'
import { ROUTE_MAP } from '@utils/routes'
import { useRouter } from 'next/router'
import { ReactNode, useEffect, useState } from 'react'
import { useQueryClient } from 'react-query'

const EstimatesPage = () => {
  const router = useRouter()
  const queryClient = useQueryClient()
  const [page, setPage] = useState(1)

  const {
    data: isLoggedIn,
    error: isLoggedInError,
    isLoading: isLoggedInLoading,
  } = useClientIsLoggedIn()

  const {
    data: estimatesData,
    error: estimatesError,
    isLoading: estimatesIsLoading,
    isPreviousData: estimatesIsPreviousData,
  } = useEstimates(page, { keepPreviousData: true, staleTime: 5000 })

  useEffect(() => {
    if (estimatesData?.hasMore) {
      queryClient.prefetchQuery(['estimates', page + 1], () =>
        getEstimates(page + 1)
      )
    }
  }, [estimatesData, page, queryClient])

  if (isLoggedInLoading || estimatesIsLoading) {
    return <Loader />
  }

  if (isLoggedInError || estimatesError) {
    return <div>There was an error</div>
  }

  if (!isLoggedIn) {
    router.push(ROUTE_MAP.app.entry)
    return <></>
  }

  return (
    <Estimates
      estimatesData={estimatesData}
      page={page}
      setPage={setPage}
      estimatesIsPreviousData={estimatesIsPreviousData}
    />
  )
}

EstimatesPage.getLayout = (page: ReactNode) => {
  return <Layout>{page}</Layout>
}

export default EstimatesPage
