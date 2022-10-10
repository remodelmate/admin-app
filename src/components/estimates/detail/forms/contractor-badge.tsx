import React, { Dispatch, FunctionComponent, SetStateAction } from 'react'

export const ContractorBadge: FunctionComponent<ContractorBadgeProps> = ({
  contractor,
  updatedContractors,
  setUpdatedContractors,
}) => {
  const onRemove = async (id: string) => {
    const filteredContractors: Contractor[] = updatedContractors.filter(
      (contractor: Contractor) => contractor._id !== id
    )

    setUpdatedContractors([...filteredContractors])
  }

  return (
    <>
      <span className="inline-flex max-w-fit items-center rounded-full bg-blueGray-100 py-0.5 pl-2 pr-0.5 text-xs font-medium text-blueGray-700">
        {`${contractor.firstName} ${contractor.lastName}`}
        <button
          type="button"
          className="ml-0.5 inline-flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full text-blueGray-400 hover:bg-blueGray-200 hover:text-blueGray-500 focus:bg-blueGray-500 focus:text-white focus:outline-none"
          onClick={() => onRemove(contractor._id)}
        >
          <span className="sr-only">Remove small option</span>
          <svg
            className="h-2 w-2"
            stroke="currentColor"
            fill="none"
            viewBox="0 0 8 8"
          >
            <path
              strokeLinecap="round"
              strokeWidth="1.5"
              d="M1 1l6 6m0-6L1 7"
            />
          </svg>
        </button>
      </span>
    </>
  )
}

interface ContractorBadgeProps {
  contractor: Contractor
  updatedContractors: Contractor[]
  setUpdatedContractors: Dispatch<SetStateAction<Contractor[]>>
}
