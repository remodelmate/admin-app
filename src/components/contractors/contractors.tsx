import { Dispatch, FunctionComponent, SetStateAction } from 'react'

export const Contractors: FunctionComponent<ContractorsProps> = ({
  contractorsData,
  page,
  setPage,
  contractorsIsPreviousData,
}) => {
  console.log({ contractorsData, page, setPage, contractorsIsPreviousData })
  return <div>Contractors Test Page</div>
}

interface ContractorsProps {
  contractorsData: any
  page: number
  setPage: Dispatch<SetStateAction<number>>
  contractorsIsPreviousData: boolean
}
