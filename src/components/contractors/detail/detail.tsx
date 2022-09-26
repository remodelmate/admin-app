import { FunctionComponent } from 'react'

export const ContractorDetail: FunctionComponent<ContractorDetailProps> = ({
  contractor,
}) => {
  console.log(contractor)
  return (
    <div>
      <h1>Hi Contractor</h1>
    </div>
  )
}

interface ContractorDetailProps {
  contractor: Contractor
}
