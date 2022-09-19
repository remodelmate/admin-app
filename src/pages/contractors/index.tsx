import { Layout } from '@components/layout'

const ContractorsPage = () => {
  return (
    <div>
      <h1>Test Contractors Page</h1>
    </div>
  )
}

ContractorsPage.getLayout = (page: any) => {
  return <Layout>{page}</Layout>
}

export default ContractorsPage
