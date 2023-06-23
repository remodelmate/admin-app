import { format } from 'date-fns'
import { formatPhoneNumber } from '@utils/phone'
import { FunctionComponent, ReactNode } from 'react'
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline'
import { formatCurrency } from '@utils/currency'
import Link from 'next/link'
import { interpolateParams, ROUTE_MAP } from '@utils/routes'

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

const DetailSection: FunctionComponent<DetailSectionProps> = ({
  name,
  phone,
  email,
  dateCreated,
  stripeCustomerId,
}) => {
  return (
    <div className="overflow-hidden bg-white shadow sm:rounded-lg">
      <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
        <dl className="sm:divide-y sm:divide-gray-200">
          <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Full name</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              {name}
            </dd>
          </div>
          <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Email Address</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              {email}
            </dd>
          </div>
          <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Phone</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              <a href={`tel:${phone}`}>{formatPhoneNumber(phone)}</a>
            </dd>
          </div>
          <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">
              Stripe Customer Id
            </dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              {stripeCustomerId ? stripeCustomerId : 'N/A'}
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

const EstimatesSection: FunctionComponent<EstimatesSectionProps> = ({
  estimates,
}) => {
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
                    Address
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Activated
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Completed
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap"
                  >
                    Total Cost
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Date Created
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">View more</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {estimates.map((estimate: Estimate) => {
                  return (
                    <tr
                      key={estimate._id}
                      className="hover:bg-gray-100 transition-all"
                    >
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {estimate.address.street}
                        </div>
                        {estimate.address.additional ? (
                          <div className="text-sm text-gray-900">
                            {estimate.address.additional}
                          </div>
                        ) : null}
                        <div className="text-sm text-gray-500">
                          {`${estimate.address.city}, ${estimate.address.state} ${estimate.address.zip}`}
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {estimate.activated ? (
                            <CheckCircleIcon className="h-5 w-5 text-green-500" />
                          ) : (
                            <XCircleIcon className="h-5 w-5 text-red-500" />
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {estimate.completed ? (
                            <CheckCircleIcon className="h-5 w-5 text-green-500" />
                          ) : (
                            <XCircleIcon className="h-5 w-5 text-red-500" />
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {formatCurrency(estimate.totalCost)}
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {format(new Date(estimate.dateCreated), 'PP p')}
                        </div>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="text-indigo-600 ">
                          <Link
                            href={interpolateParams(
                              ROUTE_MAP.app.estimateDetail,
                              { estimateId: estimate._id }
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

export const HomeownerDetail: FunctionComponent<HomeownerDetailProps> = ({
  homeowner,
}) => {
  const { email, phone, dateCreated, stripeCustomerId, estimates } = homeowner
  const name = `${homeowner.firstName} ${homeowner.lastName}`

  return (
    <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 mb-16 sm:mb-20">
      <Section title={'Homeowner Detail'}>
        <DetailSection
          name={name}
          email={email}
          phone={phone}
          dateCreated={dateCreated}
          stripeCustomerId={stripeCustomerId}
        />
      </Section>
      <Section title={'Estimates'}>
        <EstimatesSection estimates={estimates} />
      </Section>
    </main>
  )
}

interface SectionProps {
  title: string
  children: ReactNode
}

interface DetailSectionProps {
  name: string
  email: string
  phone: string
  dateCreated: Date
  stripeCustomerId: string
}

interface EstimatesSectionProps {
  estimates: []
}

interface HomeownerDetailProps {
  homeowner: Homeowner
}
