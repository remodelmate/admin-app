import { Dispatch, FunctionComponent, SetStateAction, useState } from 'react'
import { ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { Combobox } from '@headlessui/react'
import clsx from 'clsx'
import { useContractorsDropdown } from '@hooks/contractors'

export const EstimateContractorsDropdown: FunctionComponent<
  EstimateContractorsDropdownProps
> = ({ updatedContractors, setUpdatedContractors }) => {
  const [selectedPerson, setSelectedPerson] = useState<Contractor>()

  const { data: contractorsList } = useContractorsDropdown()

  const selectContractor = (contractor: Contractor) => {
    setSelectedPerson(contractor)
    setUpdatedContractors([...updatedContractors, contractor])
  }

  const filteredContractors = contractorsList?.contractors?.filter(
    (contractor: Contractor) =>
      !updatedContractors?.some(
        updatedContractor => updatedContractor._id === contractor._id
      )
  )

  return (
    <Combobox as="div" value={selectedPerson} onChange={selectContractor}>
      <Combobox.Label className="block text-sm font-medium text-gray-700">
        Assign to
      </Combobox.Label>
      <div className="relative mt-1">
        <Combobox.Input
          className="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 shadow-sm focus:border-blueGray-500 focus:outline-none focus:ring-1 focus:ring-blueGray-500 sm:text-sm"
          displayValue={(contractor: Contractor) => (contractor ? '' : '')}
          onChange={event => (event ? null : null)}
        />
        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
          <ChevronUpDownIcon
            className="h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        </Combobox.Button>

        {contractorsList?.contractors?.length > 0 && (
          <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {filteredContractors.map((contractor: Contractor) => (
              <Combobox.Option
                key={contractor._id}
                value={contractor}
                className={({ active }) =>
                  clsx(
                    active ? 'bg-blueGray-600 text-white' : 'text-gray-900',
                    'relative cursor-default select-none py-2 pl-3 pr-9'
                  )
                }
              >
                <div className="flex">
                  <span className={'truncate'}>
                    {`${contractor.firstName} ${contractor.lastName}`}
                  </span>
                  <span className={'ml-2 truncate text-gray-500'}>
                    {contractor.email}
                  </span>
                </div>
              </Combobox.Option>
            ))}
          </Combobox.Options>
        )}
      </div>
    </Combobox>
  )
}

interface EstimateContractorsDropdownProps {
  updatedContractors: Contractor[]
  setUpdatedContractors: Dispatch<SetStateAction<Contractor[]>>
}
