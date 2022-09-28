import Link from 'next/link'
import { FunctionComponent, ReactNode, useState } from 'react'
import { format } from 'date-fns'
import { formatPhoneNumber } from '@utils/phone'
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline'
import { formatCurrency } from '@utils/currency'
import { interpolateParams, ROUTE_MAP } from '@utils/routes'
import Image from 'next/image'
import { EnlargeImage } from '@components/shared'

const Section: FunctionComponent<SectionProps> = ({ title, children }) => {
  return (
    <div>
      <div className="mb-4">
        <h1 className="text-3xl font-semibold text-gray-900">{title}</h1>
      </div>
      <div className="mb-10">{children}</div>
    </div>
  )
}

const DetailSection: FunctionComponent<DetailSectionProps> = ({ estimate }) => {
  const {
    _homeowner,
    address,
    activated,
    completed,
    totalCost,
    remainingBalance,
    contractors,
    dateCreated,
  } = estimate

  return (
    <div className="overflow-hidden bg-white shadow sm:rounded-lg">
      <div className="border-gray-200 px-4 py-5 sm:p-0">
        <dl className="sm:divide-y sm:divide-gray-200">
          <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Homeowner</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              {`${_homeowner.firstName} ${_homeowner.lastName}`}
            </dd>
          </div>
          <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Address</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              <div className="text-sm text-gray-900">{address.street}</div>
              <div className="text-sm text-gray-500">
                {`${address.city}, ${address.state} ${address.zip}`}
              </div>
            </dd>
          </div>
          <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Email</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              {_homeowner.email}
            </dd>
          </div>
          <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Phone</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              <a href={`tel:${_homeowner.phone}`}>
                {formatPhoneNumber(_homeowner.phone)}
              </a>
            </dd>
          </div>
          <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Contractors</dt>
            <dd className="mt-1 text-sm text-gray-500 sm:col-span-2 sm:mt-0 space-y-1">
              {contractors?.map((contractor: Contractor) => (
                <div
                  key={contractor._id}
                  className="flex flex-col badge badge-outline"
                >
                  {`${contractor.firstName} ${contractor.lastName}`}
                </div>
              ))}
            </dd>
          </div>
          <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Activated</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              {activated ? (
                <CheckCircleIcon className="h-5 w-5 text-green-500" />
              ) : (
                <XCircleIcon className="h-5 w-5 text-red-500" />
              )}
            </dd>
          </div>
          <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Completed</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              {completed ? (
                <CheckCircleIcon className="h-5 w-5 text-green-500" />
              ) : (
                <XCircleIcon className="h-5 w-5 text-red-500" />
              )}
            </dd>
          </div>
          <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Total Cost</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              {formatCurrency(totalCost)}
            </dd>
          </div>
          <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">
              Balance Remaining
            </dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              {formatCurrency(remainingBalance)}
            </dd>
          </div>
          <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Date Created</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              {format(new Date(dateCreated), 'PP p')}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  )
}

const MilestonesSection: FunctionComponent<MilestonesSectionProps> = ({
  milestones,
}) => {
  const [imageClick, setImageClick] = useState(false)
  const [enlargeSrc, setEnlargeSrc] = useState('')

  const handleClick = (imageSrc: string) => {
    setEnlargeSrc(imageSrc)
    setImageClick(true)
  }

  return (
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Contractor
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Milestone
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Price
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Receipt
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Images
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Notes
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">View more</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {milestones.map((milestone: Milestone) => {
                  const {
                    receipt,
                    _contractor,
                  }: { receipt: Receipt; _contractor: Contractor } = milestone
                  return (
                    <tr
                      key={milestone._id}
                      className="hover:bg-gray-100 transition-all"
                    >
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {_contractor
                            ? `${_contractor?.firstName} ${_contractor?.lastName}`
                            : ''}
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="text-sm text-gray-900">
                          {milestone.name}
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {formatCurrency(milestone.price)}
                        </div>
                      </td>
                      {/* //TODO: Style with badges like contractor app */}
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {milestone.status}
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="text-sm text-blue-600">
                          {receipt ? <a href={receipt?.link}>Link</a> : ''}
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex flex-grow space-x-1 text-sm">
                          {milestone.images?.map(image => {
                            return (
                              <Image
                                className="cursor-pointer"
                                key={image}
                                src={image}
                                alt="bathroom"
                                width="60"
                                height="40"
                                objectFit="cover"
                                onClick={() => handleClick(image)}
                              />
                            )
                          })}
                          <EnlargeImage
                            imageClick={imageClick}
                            setImageClick={setImageClick}
                            enlargeSrc={enlargeSrc}
                            setEnlargeSrc={setEnlargeSrc}
                          />
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="text-sm text-gray-900">
                          {milestone.notes}
                        </div>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="text-indigo-600 ">
                          <Link
                            href={interpolateParams(
                              ROUTE_MAP.app.estimateDetail,
                              { milestoneId: milestone._id }
                            )}
                          >
                            <span className="hover:underline cursor-pointer transition-all">
                              View more
                            </span>
                          </Link>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export const EstimateDetail: FunctionComponent<EstimateDetailProps> = ({
  estimate,
}) => {
  const { milestones } = estimate
  return (
    <main className="flex-1 max-w-full mx-auto px-4 sm:px-6 md:px-8 mb-16 sm:mb-20">
      <Section title="Estimate Detail">
        <DetailSection estimate={estimate} />
      </Section>
      <Section title="Milestones">
        <MilestonesSection milestones={milestones} />
      </Section>
    </main>
  )
}

interface SectionProps {
  title: string
  children: ReactNode
}

interface DetailSectionProps {
  estimate: Estimate
}

interface MilestonesSectionProps {
  milestones: Milestone[]
}

interface EstimateDetailProps {
  estimate: Estimate
}
