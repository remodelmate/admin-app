import { Dispatch, FunctionComponent, SetStateAction } from 'react'

export const Estimates: FunctionComponent<EstimatesProps> = ({
  estimatesData,
  // page,
  // setPage,
  // estimatesIsPreviousData,
}) => {
  console.log(estimatesData)
  return (
    <div>
      <h1>Estimates Test</h1>
    </div>
  )
}

interface EstimatesProps {
  estimatesData: any
  page: number
  setPage: Dispatch<SetStateAction<number>>
  estimatesIsPreviousData: boolean
}
