import { Contractors } from '@components/contractors'
import { Layout } from '@components/layout'
import { Loader } from '@components/shared'
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
  const [filter, setFilter] = useState('')

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
  } = useContractors(page, filter, { keepPreviousData: true, staleTime: 5000 })

  useEffect(() => {
    if (contractorsData?.hasMore) {
      queryClient.prefetchQuery(['contractors', page + 1, filter], () =>
        getContractors(page + 1, filter)
      )
    }
  }, [contractorsData, page, queryClient, filter])

  if (isLoggedInLoading || contractorsIsLoading) {
    return <Loader />
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
      setFilter={setFilter}
    />
  )
}

ContractorsPage.getLayout = (page: ReactNode) => {
  return <Layout>{page}</Layout>
}

export default ContractorsPage
