import { useRouter } from 'next/router'
import { useClientIsLoggedIn } from '@utils/magic'
import { ContractorDetail } from '@components/contractors'
import { Layout } from '@components/layout'
import { Loader } from '@components/shared'
import { useContractor } from '@hooks/contractors'
import { ROUTE_MAP } from '@utils/routes'

const ContractorPage = () => {
  const router = useRouter()
  const { contractorId } = router.query

  const {
    data: isLoggedIn,
    error: isLoggedInError,
    isLoading: isLoggedInLoading,
  } = useClientIsLoggedIn()

  const {
    data: contractorData,
    error: contractorError,
    isLoading: contractorIsLoading,
  } = useContractor(contractorId as string, { enabled: !!contractorId })

  if (isLoggedInLoading || contractorIsLoading) {
    return <Loader />
  }

  if (isLoggedInError || contractorError) {
    return <div>There was an error. Try closing browser and log back in.</div>
  }

  if (!isLoggedIn) {
    router.push(ROUTE_MAP.app.entry)
    return <></>
  }

  return <ContractorDetail contractor={contractorData} />
}

ContractorPage.getLayout = (page: any) => {
  return <Layout>{page}</Layout>
}

export default ContractorPage
