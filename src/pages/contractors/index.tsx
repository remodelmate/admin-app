import { Contractors } from '@components/contractors'
import { Layout } from '@components/layout'
import { getContractors, useContractors } from '@hooks/contractors'
import { useClientIsLoggedIn } from '@utils/magic'
import { ROUTE_MAP } from '@utils/routes'
import { useRouter } from 'next/router'
import { ReactNode, useEffect, useState } from 'react'
import { useQueryClient } from 'react-query'

const ContractorsPage = () => {
  const router = useRouter()
  const queryClient = useQueryClient()
  const [page, setPage] = useState(1)

  const {
    data: isLoggedIn,
    error: isLoggedInError,
    isLoading: isLoggedInLoading,
  } = useClientIsLoggedIn()

  const {
    data: contractorsData,
    error: contractorsError,
    isLoading: contractorsIsLoading,
    isPreviousData: contractorsIsPreviousData,
  } = useContractors(page, { keepPreviousData: true, staleTime: 5000 })

  useEffect(() => {
    if (contractorsData?.hasMore) {
      queryClient.prefetchQuery(['homeowners', page + 1], () =>
        getContractors(page + 1)
      )
    }
  }, [contractorsData, page, queryClient])

  if (isLoggedInLoading || contractorsIsLoading) {
    return <></>
  }

  if (isLoggedInError || contractorsError) {
    return <div>There was an error</div>
  }

  if (!isLoggedIn) {
    router.push(ROUTE_MAP.app.entry)
    return <></>
  }

  return (
    <Contractors
      contractorsData={contractorsData}
      page={page}
      setPage={setPage}
      contractorsIsPreviousData={contractorsIsPreviousData}
    />
  )
}

ContractorsPage.getLayout = (page: ReactNode) => {
  return <Layout>{page}</Layout>
}

export default ContractorsPage
