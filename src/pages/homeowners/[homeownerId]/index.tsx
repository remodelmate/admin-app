import { HomeownerDetail } from '@components/homeowners'
import { Layout } from '@components/layout'

const HomeownerPage = () => {
  return <HomeownerDetail />
}

HomeownerPage.getLayout = (page: any) => {
  return <Layout>{page}</Layout>
}

export default HomeownerPage
