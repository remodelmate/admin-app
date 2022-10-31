import { Dialog, Transition } from '@headlessui/react'
import { useQueryClient } from 'react-query'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { useCreateMilestone } from '@hooks/milestones'
import { Loader } from '@components/shared'
import {
  Dispatch,
  Fragment,
  FunctionComponent,
  SetStateAction,
  SyntheticEvent,
  useState,
} from 'react'

export const MilestoneCreate: FunctionComponent<MilestoneCreateProps> = ({
  open,
  setOpen,
  estimateId,
}) => {
  const [dataReturnLoading, setDataReturnLoading] = useState<boolean>(false)

  const cache = useQueryClient()

  const { mutateAsync: createMutateAsync } = useCreateMilestone({
    onSuccess: (_data: any) => {
      cache.invalidateQueries(['estimate', estimateId])
      setTimeout(() => {
        setOpen(false)
        setDataReturnLoading(false)
      }, 1000)
    },
    onError: (error: any) => {
      console.error('error on mutateAsync', error)
      setOpen(false)
      setDataReturnLoading(false)
    },
  })

  const onSubmit = async (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault()

    setDataReturnLoading(true)

    const form = event.currentTarget
    const formElement = form.elements as typeof form.elements & {
      _category: { value: string }
      name: { value: string }
      description: { value: string }
      price: { value: number }
      contractorPercentage: { value: number }
      status: { value: string }
    }

    const newMilestone = {
      _project: estimateId,
      _category: formElement._category.value,
      name: formElement.name.value,
      description: formElement.description.value,
      price: Number(formElement.price.value),
      contractorPercentage: Number(formElement.contractorPercentage.value),
      status: formElement.status.value,
    }

    await createMutateAsync({ newMilestone, estimateId })
  }

  const closeEdit = () => {
    setOpen(false)
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
                            Milestone Create
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
                          <div className="pt-6">
                            <label
                              htmlFor="_category"
                              className="block text-sm font-medium text-gray-900"
                            >
                              Category
                            </label>
                            <div className="mt-1">
                              <select
                                id="_category"
                                name="_category"
                                className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                defaultValue="bathroom"
                              >
                                <option value="bathroom">Bathroom</option>
                                <option value="fee">Fee</option>
                              </select>
                            </div>
                          </div>
                          <div>
                            <label
                              htmlFor="name"
                              className="block text-sm font-medium text-gray-900"
                            >
                              Milestone Name
                            </label>
                            <div className="mt-1">
                              <input
                                type="text"
                                name="name"
                                id="name"
                                maxLength={80}
                                required
                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
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
                                required
                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
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
                                id="price"
                                min={0}
                                required
                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
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
                                step="0.01"
                                name="contractorPercentage"
                                id="contractorPercentage"
                                min={0}
                                required
                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                              />
                            </div>
                          </div>
                          <div>
                            <label
                              htmlFor="status"
                              className="block text-sm font-medium text-gray-900"
                            >
                              Status
                            </label>
                            <select
                              id="status"
                              name="status"
                              className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                              defaultValue="notStarted"
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
                        className="ml-4 inline-flex justify-center rounded-md border border-transparent bg-blueGray-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blueGray-700 focus:outline-none focus:ring-2 focus:ring-blueGray-500 focus:ring-offset-2"
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
        {dataReturnLoading ? (
          <div className="w-full h-full fixed block top-0 left-0 bg-white opacity-75 z-50">
            <Loader />
          </div>
        ) : null}
      </Dialog>
    </Transition.Root>
  )
}

interface MilestoneCreateProps {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  estimateId: Estimate['_id']
}
