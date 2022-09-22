import { Dispatch, FunctionComponent, SetStateAction } from 'react'
import { PaginateButtons } from '@components/shared'
import Link from 'next/link'
import { interpolateParams, ROUTE_MAP } from '@utils/routes'
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline'
import { format } from 'date-fns'
import { formatCurrency } from '@utils/currency'

const EstimatesTable: FunctionComponent<EstimatesTableProps> = ({
  estimatesData,
  page,
  setPage,
  estimatesIsPreviousData,
}) => {
  const { pageTotal, pageSize, estimatesCount, hasMore, estimates } =
    estimatesData

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
                    Homeowner
                  </th>
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
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="text-sm text-gray-900">
                          {`${estimate._homeowner?.firstName} ${estimate._homeowner?.lastName}`}
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        {estimate.contractors.map((contractor: Contractor) => {
                          return (
                            <div
                              key={contractor._id}
                              className="text-sm text-gray-900"
                            >
                              {`${contractor.firstName} ${contractor.lastName}`}
                            </div>
                          )
                        })}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {estimate.address.street}
                        </div>
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
                              ROUTE_MAP.app.projectsDetail,
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

      <PaginateButtons
        hasMore={hasMore}
        isPreviousData={estimatesIsPreviousData}
        page={page}
        setPage={setPage}
        pageSize={pageSize}
        totalCount={estimatesCount}
        pageTotal={pageTotal}
      />
    </div>
  )
}

export const Estimates: FunctionComponent<EstimatesProps> = ({
  estimatesData,
  page,
  setPage,
  estimatesIsPreviousData,
}) => {
  return (
    <main className="flex-1 mb-10 sm:mb-12">
      <div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <h1 className="text-3xl font-semibold text-gray-900">Homeowners</h1>
        </div>
        <div className="max-w-7xl mx-auto p-4 sm:px-6 md:px-8">
          <EstimatesTable
            estimatesData={estimatesData}
            page={page}
            setPage={setPage}
            estimatesIsPreviousData={estimatesIsPreviousData}
          />
        </div>
      </div>
    </main>
  )
}

interface EstimatesProps {
  estimatesData: any
  page: number
  setPage: Dispatch<SetStateAction<number>>
  estimatesIsPreviousData: boolean
}

interface EstimatesTableProps {
  estimatesData: any
  page: number
  setPage: Dispatch<SetStateAction<number>>
  estimatesIsPreviousData: boolean
}
