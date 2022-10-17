import {
  Dispatch,
  Fragment,
  FunctionComponent,
  SetStateAction,
  SyntheticEvent,
  useState,
} from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { useQueryClient } from 'react-query'
import clsx from 'clsx'
import { ActionModal, Loader } from '@components/shared'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { useDeleteMilestone, useUpdateMilestone } from '@hooks/milestones'
import { TrashIcon } from '@heroicons/react/20/solid'

export const MilestoneEdit: FunctionComponent<MilestoneEditProps> = ({
  open,
  setOpen,
  milestone,
  assignedContractors,
}) => {
  const [updatedMilestone, setUpdatedMilestone] = useState<Milestone>(milestone)
  const [milestoneContractor, setMilestoneContractor] = useState<Contractor>(
    milestone._contractor
  )
  const [modalOpen, setModalOpen] = useState<boolean>(false)

  const closeEdit = () => {
    setOpen(false)
    setUpdatedMilestone(milestone)
  }

  // Disables save button
  const isDisabled =
    milestone?._contractor?._id === milestoneContractor?._id &&
    milestone.name === updatedMilestone.name &&
    milestone.description === updatedMilestone.description &&
    milestone.price === updatedMilestone.price &&
    milestone.contractorPercentage === updatedMilestone.contractorPercentage &&
    milestone.status === updatedMilestone.status

  const cache = useQueryClient()

  const { mutateAsync: updateMutateAsync, isLoading: updateIsLoading } =
    useUpdateMilestone({
      onSuccess: (_data: any) => {
        cache.invalidateQueries(['estimate', milestone._project])
      },
      onError: (error: any) => {
        console.error('error on mutateAsync', error)
      },
    })

  const { mutateAsync: deleteMutateAsync, isLoading: deleteIsLoading } =
    useDeleteMilestone({
      onSuccess: (_data: any) => {
        cache.invalidateQueries(['estimate', milestone._project])
      },
      onError: (error: any) => {
        console.error('error on mutateAsync', error)
      },
    })

  const onSubmit = async (event: SyntheticEvent) => {
    event.preventDefault()

    setOpen(false)

    await updateMutateAsync({ updatedMilestone })
  }

  const onDelete = async (event: SyntheticEvent) => {
    event.preventDefault()

    setOpen(false)

    const id = milestone._id
    await deleteMutateAsync({ id })
  }

  const closeModal = (event: SyntheticEvent) => {
    event.preventDefault()

    closeEdit()
    setModalOpen(false)
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
                            Milestone Edit
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
                                onClick={closeEdit}
                              />
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-1 flex-col justify-between">
                        <div className="px-4 sm:px-6 space-y-4">
                          <div className="space-y-6 pt-6 pb-6">
                            <div>
                              <h3 className="text-sm font-medium text-gray-900">
                                Assigned Contractor
                              </h3>
                              <div className="mt-2">
                                {milestoneContractor && (
                                  <span className="inline-flex max-w-fit items-center rounded-full bg-blueGray-100 py-0.5 pl-2 pr-0.5 text-xs font-medium text-blueGray-700">
                                    {`${milestoneContractor?.firstName} ${milestoneContractor?.lastName}`}
                                    <button
                                      type="button"
                                      className="ml-0.5 inline-flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full text-blueGray-400 hover:bg-blueGray-200 hover:text-blueGray-500 focus:bg-blueGray-500 focus:text-white focus:outline-none"
                                      onClick={() => {
                                        setUpdatedMilestone({
                                          ...updatedMilestone,
                                          _contractor: null,
                                        })
                                        setMilestoneContractor(null)
                                      }}
                                    >
                                      <span className="sr-only">
                                        Remove small option
                                      </span>
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
                                )}
                              </div>
                            </div>
                            <div>
                              <label
                                htmlFor="status"
                                className="block text-sm font-medium text-gray-700"
                              >
                                Assign to
                              </label>
                              <select
                                id="status"
                                name="status"
                                className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                value=""
                                onChange={e => {
                                  setUpdatedMilestone({
                                    ...updatedMilestone,
                                    _contractor: JSON.parse(e.target.value)._id,
                                  })
                                  setMilestoneContractor(
                                    JSON.parse(e.target.value)
                                  )
                                }}
                              >
                                <option value="" disabled defaultChecked>
                                  (Select contractor)
                                </option>

                                {assignedContractors?.map(
                                  (contractor: Contractor) => (
                                    <option
                                      key={contractor._id}
                                      value={JSON.stringify(contractor)}
                                    >{`${contractor.firstName} ${contractor.lastName}`}</option>
                                  )
                                )}
                              </select>
                            </div>
                          </div>
                          <div>
                            <label
                              htmlFor="category"
                              className="block text-sm font-medium text-gray-900"
                            >
                              Category
                            </label>
                            <div className="mt-1">
                              <input
                                type="text"
                                name="category"
                                id="category"
                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                value={milestone._category}
                                disabled
                              />
                            </div>
                          </div>
                          <div>
                            <label
                              htmlFor="name"
                              className="block text-sm font-medium text-gray-900"
                            >
                              Milestone
                            </label>
                            <div className="mt-1">
                              <input
                                type="text"
                                name="name"
                                id="name"
                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                defaultValue={updatedMilestone.name}
                                maxLength={80}
                                onChange={e => {
                                  setUpdatedMilestone({
                                    ...updatedMilestone,
                                    name: e.target.value,
                                  })
                                }}
                              />
                            </div>
                          </div>
                          <div>
                            <label
                              htmlFor="description"
                              className="block text-sm font-medium text-gray-900"
                            >
                              Description
                            </label>
                            <div className="mt-1">
                              <textarea
                                name="description"
                                id="description"
                                rows={8}
                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                defaultValue={updatedMilestone.description}
                                onChange={e => {
                                  setUpdatedMilestone({
                                    ...updatedMilestone,
                                    description: e.target.value,
                                  })
                                }}
                              />
                            </div>
                          </div>
                          <div>
                            <label
                              htmlFor="price"
                              className="block text-sm font-medium text-gray-900"
                            >
                              Price
                            </label>
                            <div className="mt-1">
                              <input
                                type="number"
                                name="price"
                                id="contractorPercentage"
                                min={0}
                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                defaultValue={updatedMilestone.price}
                                onChange={e => {
                                  setUpdatedMilestone({
                                    ...updatedMilestone,
                                    price: Number(e.target.value),
                                  })
                                }}
                              />
                            </div>
                          </div>
                          <div>
                            <label
                              htmlFor="contractorPercentage"
                              className="block text-sm font-medium text-gray-900"
                            >
                              Contractor's Percentage
                            </label>
                            <div className="mt-1">
                              <input
                                type="number"
                                name="contractorPercentage"
                                id="contractorPercentage"
                                min={0}
                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                defaultValue={
                                  updatedMilestone.contractorPercentage
                                }
                                onChange={e => {
                                  setUpdatedMilestone({
                                    ...updatedMilestone,
                                    contractorPercentage: Number(
                                      e.target.value
                                    ),
                                  })
                                }}
                              />
                            </div>
                          </div>
                          <div>
                            <label
                              htmlFor="status"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Status
                            </label>
                            <select
                              id="status"
                              name="status"
                              className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                              defaultValue={updatedMilestone.status}
                              onChange={e => {
                                setUpdatedMilestone({
                                  ...updatedMilestone,
                                  status: e.target.value,
                                })
                              }}
                            >
                              <option value="notStarted">Not Started</option>
                              <option value="inProgress">In Progress</option>
                              <option value="pendingReview">
                                Pending Review
                              </option>
                              <option value="rejected">Rejected</option>
                              <option value="approved">Approved</option>
                            </select>
                          </div>
                          <div className="pt-14 float-right">
                            <button
                              type="button"
                              className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                              onClick={() => setModalOpen(true)}
                            >
                              <TrashIcon
                                className="-ml-1 mr-3 h-5 w-5"
                                aria-hidden="true"
                              />
                              DELETE
                            </button>
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
                          isDisabled ? 'opacity-50 disabled' : '',
                          'ml-4 inline-flex justify-center rounded-md border border-transparent bg-blueGray-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blueGray-700 focus:outline-none focus:ring-2 focus:ring-blueGray-500 focus:ring-offset-2'
                        )}
                        disabled={isDisabled}
                      >
                        Save
                      </button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
        {(updateIsLoading || deleteIsLoading) && (
          <div className="w-full h-full fixed block top-0 left-0 bg-white opacity-75 z-50">
            <Loader />
          </div>
        )}
        {modalOpen && (
          <ActionModal
            message={'Confirm to delete Milestone'}
            modalOpen={modalOpen}
            closeModal={closeModal}
            action={onDelete}
          />
        )}
      </Dialog>
    </Transition.Root>
  )
}

interface MilestoneEditProps {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  milestone: Milestone
  assignedContractors: Contractor[]
}
