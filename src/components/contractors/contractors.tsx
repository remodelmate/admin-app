import { interpolateParams, ROUTE_MAP } from '@utils/routes'
import Link from 'next/link'
import { ChangeEvent, Dispatch, FunctionComponent, SetStateAction } from 'react'
import { PaginateButtons } from '@components/shared'

const ContractorsTable: FunctionComponent<ContractorsTableProps> = ({
  contractorsData,
  page,
  setPage,
  contractorsIsPreviousData,
}) => {
  const { pageTotal, pageSize, contractorsCount, hasMore, contractors } =
    contractorsData

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
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Email
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Phone
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    <span>Company</span>
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Category
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">View more</span>
                  </th>
                </tr>
              </thead>

              <tbody className="bg-white divide-y divide-gray-200">
                {contractors.map((contractor: Contractor) => {
                  return (
                    <tr
                      key={contractor._id}
                      className="hover:bg-gray-100 transition-all"
                    >
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="text-sm text-gray-900">
                          {`${contractor.firstName} ${contractor.lastName}`}
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {contractor.email}
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {contractor.phone.replace(
                            /^(\d{3})(\d{3})(\d{4})/,
                            '$1-$2-$3'
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="text-sm text-gray-900">
                          {contractor.companyName}
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="text-sm text-gray-900">
                          {contractor.category
                            ? contractor.category.charAt(0).toUpperCase() +
                              contractor.category.slice(1)
                            : 'N/A'}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="text-indigo-600 ">
                          <Link
                            href={interpolateParams(
                              ROUTE_MAP.app.contractorDetail,
                              { contractorId: contractor._id }
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
        isPreviousData={contractorsIsPreviousData}
        page={page}
        setPage={setPage}
        pageSize={pageSize}
        totalCount={contractorsCount}
        pageTotal={pageTotal}
      />
    </div>
  )
}

export const Contractors: FunctionComponent<ContractorsProps> = ({
  contractorsData,
  page,
  setPage,
  contractorsIsPreviousData,
  setFilter,
}) => {
  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    setPage(1)
    setFilter(event.target.value)
  }

  return (
    <main className="flex-1 mb-10 sm:mb-12">
      <div>
        <div className="flex justify-between max-w-full mx-auto px-4 sm:px-6 md:px-8">
          <h1 className="text-3xl font-semibold text-gray-900">Contractors</h1>
          <input
            type="text"
            placeholder="Search"
            className="input input-bordered w-full max-w-xs"
            onChange={onChange}
          />
        </div>
        <div className="max-w-7xl mx-auto p-4 sm:px-6 md:px-8">
          <ContractorsTable
            contractorsData={contractorsData}
            page={page}
            setPage={setPage}
            contractorsIsPreviousData={contractorsIsPreviousData}
          />
        </div>
      </div>
    </main>
  )
}

interface ContractorsProps {
  contractorsData: any
  page: number
  setPage: Dispatch<SetStateAction<number>>
  contractorsIsPreviousData: boolean
  setFilter: Dispatch<SetStateAction<string>>
}

interface ContractorsTableProps {
  contractorsData: any
  page: number
  setPage: Dispatch<SetStateAction<number>>
  contractorsIsPreviousData: boolean
}
