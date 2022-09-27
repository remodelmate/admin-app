import { FunctionComponent } from 'react'

export const EstimateDetail: FunctionComponent<EstimateDetailProps> = ({
  estimate,
}) => {
  console.log(estimate)
  return (
    <div>
      <h1>Hello Estimate Detail</h1>
    </div>
  )
}

interface EstimateDetailProps {
  estimate: Estimate
}
