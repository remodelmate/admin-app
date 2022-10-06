import {
  Dispatch,
  Fragment,
  FunctionComponent,
  SetStateAction,
  useState,
} from 'react'
import clsx from 'clsx'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { ContractorsDropdown } from './contractors-dropdown'
import { Toggle } from './toggle'
import { ContractorBadge } from './contractor-badge'

export const EstimateEdit: FunctionComponent<EstimateEditProps> = ({
  open,
  setOpen,
  assignedContractors,
  estimate,
}) => {
  const [activatedEnabled, setActivatedEnabled] = useState<boolean>(
    estimate?.activated
  )

  const [completedEnabled, setCompletedEnabled] = useState<boolean>(
    estimate?.completed
  )

  const [updatedContractors, setUpdatedContractors] = useState<Contractor[]>(
    assignedContractors || []
  )

  const closeEdit = () => {
    setOpen(false)
    setActivatedEnabled(estimate?.activated)
    setCompletedEnabled(estimate?.completed)
    setUpdatedContractors(assignedContractors || [])
  }

  // Compare assigned contractors in MongoDB vs updated contractors by admin
  // TODO: Maybe extract this out
  const contractorsDiff = () => {
    for (let i = 0; i < updatedContractors?.length; i++) {
      if (
        !assignedContractors?.some(
          assignedContractor =>
            assignedContractor._id === updatedContractors[i]._id
        )
      ) {
        return false
      }
    }

    for (let i = 0; i < assignedContractors?.length; i++) {
      if (
        !updatedContractors?.some(
          updatedContractor =>
            updatedContractor._id === assignedContractors[i]._id
        )
      ) {
        return false
      }
    }
    return true
  }

  // Disables save button
  const isDisabled =
    contractorsDiff() &&
    activatedEnabled === estimate.activated &&
    completedEnabled === estimate.completed

  const onSubmit = (event: any) => {
    event.preventDefault()
  }

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <div className="fixed inset-0" />

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <form
                    className="flex h-full flex-col divide-y divide-gray-200 bg-white shadow-xl"
                    onSubmit={onSubmit}
                  >
                    <div className="h-0 flex-1 overflow-y-auto">
                      <div className="bg-blueGray-700 py-6 px-4 sm:px-6">
                        <div className="flex items-center justify-between">
                          <Dialog.Title className="text-lg font-medium text-white">
                            Estimate Edit
                          </Dialog.Title>
                          <div className="ml-3 flex h-7 items-center">
                            <button
                              type="button"
                              className="rounded-md bg-blueGray-700 text-blueGray-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                              onClick={() => setOpen(false)}
                            >
                              <span className="sr-only">Close panel</span>
                              <XMarkIcon
                                className="h-6 w-6"
                                aria-hidden="true"
                              />
                            </button>
                          </div>
                        </div>
                        {/* <div className="mt-1">
                          <p className="text-sm text-blueGray-300">
                            Get started by filling in the information below to
                            create your new project.
                          </p>
                        </div> */}
                      </div>
                      <div className="flex flex-1 flex-col justify-between">
                        <div className="divide-y divide-gray-200 px-4 sm:px-6">
                          <div className="space-y-6 pt-6 pb-6">
                            <div>
                              <h3 className="text-sm font-medium text-gray-900">
                                Assigned Contractors
                              </h3>
                              <div className="mt-2">
                                <div className="flex flex-col space-y-2">
                                  {updatedContractors?.map(contractor => (
                                    <ContractorBadge
                                      key={contractor._id}
                                      contractor={contractor}
                                      updatedContractors={updatedContractors}
                                      setUpdatedContractors={
                                        setUpdatedContractors
                                      }
                                    />
                                  ))}
                                </div>
                              </div>
                            </div>
                            <ContractorsDropdown
                              updatedContractors={updatedContractors}
                              setUpdatedContractors={setUpdatedContractors}
                            />
                          </div>
                          <div className="pt-6 pb-6 space-y-6">
                            <Toggle
                              title={'Activate'}
                              enabled={activatedEnabled}
                              setEnabled={setActivatedEnabled}
                            />
                            <Toggle
                              title={'Complete'}
                              enabled={completedEnabled}
                              setEnabled={setCompletedEnabled}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-shrink-0 justify-end px-4 py-4">
                      <button
                        type="button"
                        className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blueGray-500 focus:ring-offset-2"
                        onClick={closeEdit}
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className={clsx(
                          isDisabled ? 'opacity-50' : '',
                          'ml-4 inline-flex justify-center rounded-md border border-transparent bg-blueGray-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blueGray-700 focus:outline-none focus:ring-2 focus:ring-blueGray-500 focus:ring-offset-2'
                        )}
                        disabled={isDisabled}
                      >
                        Save
                      </button>
                    </div>
                    <pre>
                      {JSON.stringify(
                        {
                          updatedContractors,
                          activatedEnabled,
                          completedEnabled,
                        },
                        null,
                        2
                      )}
                    </pre>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

interface EstimateEditProps {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  assignedContractors: Contractor[]
  estimate: Estimate
}
