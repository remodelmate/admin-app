import { Layout } from '@components/layout'

const HomeownersPage = () => {
  return (
    <div>
      <h1>Test Homeowners Page</h1>
    </div>
  )
}

HomeownersPage.getLayout = (page: any) => {
  return <Layout>{page}</Layout>
}

export default HomeownersPage
