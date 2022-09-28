import { useRouter } from 'next/router'
import { useClientIsLoggedIn } from '@utils/magic'
import { EstimateDetail } from '@components/estimates'
import { Layout } from '@components/layout'
import { Loader } from '@components/shared'
import { useEstimate } from '@hooks/estimates'
import { ROUTE_MAP } from '@utils/routes'

const EstimatePage = () => {
  const router = useRouter()
  const { estimateId } = router.query

  const {
    data: isLoggedIn,
    error: isLoggedInError,
    isLoading: isLoggedInLoading,
  } = useClientIsLoggedIn()

  const {
    data: estimateData,
    error: estimateError,
    isLoading: estimateIsLoading,
  } = useEstimate(estimateId as string, { enabled: !!estimateId })

  if (isLoggedInLoading || estimateIsLoading) {
    return <Loader />
  }

  if (isLoggedInError || estimateError) {
    return <div>There was an error. Try closing browser and log back in.</div>
  }

  if (!isLoggedIn) {
    router.push(ROUTE_MAP.app.entry)
    return <></>
  }

  return <EstimateDetail estimate={estimateData} />
}

EstimatePage.getLayout = (page: any) => {
  return <Layout>{page}</Layout>
}

export default EstimatePage
