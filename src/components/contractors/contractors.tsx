import { interpolateParams, ROUTE_MAP } from '@utils/routes'
import Link from 'next/link'
import { Dispatch, FunctionComponent, SetStateAction } from 'react'

const ContractorsTable: FunctionComponent<ContractorsTableProps> = ({
  contractorsData,
  // page,
  // setPage,
  // contractorsIsPreviousData,
}) => {
  // const { pageTotal, pageSize, homeownersCount, hasMore } = contractorsData

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
                    Category
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
                    className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    <span>License</span>
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    <span>Insurance</span>
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    <span>Activated</span>
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    <span>Background</span>
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">View more</span>
                  </th>
                </tr>
              </thead>

              <tbody className="bg-white divide-y divide-gray-200">
                {contractorsData.contractors.map((contractor: any) => {
                  return (
                    <tr
                      key={contractor._id}
                      className="hover:bg-gray-100 transition-all"
                    >
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="text-sm text-gray-900">
                          {contractor.category}
                        </div>
                      </td>
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
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {String(
                            contractor.contractorsLicense.licenseVerified
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {String(contractor.insurancePolicy.insuranceVerified)}
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {String(contractor.activated)}
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          <span className=" align-middle">
                            {contractor.backgroundCheckStatus}
                          </span>
                        </div>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="text-indigo-600 ">
                          <Link
                            href={interpolateParams(
                              ROUTE_MAP.app.projectsDetail,
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
    </div>
  )
}

export const Contractors: FunctionComponent<ContractorsProps> = ({
  contractorsData,
  page,
  setPage,
  contractorsIsPreviousData,
}) => {
  console.log({ contractorsData, page, setPage, contractorsIsPreviousData })
  return (
    <main className="flex-1 mb-10 sm:mb-12">
      <div>
        <div className="max-w-full mx-auto px-4 sm:px-6 md:px-8">
          <h1 className="text-3xl font-semibold text-gray-900">Contractors</h1>
        </div>
        <div className="max-w-full mx-auto p-4 sm:px-6 md:px-8">
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
}

interface ContractorsTableProps {
  contractorsData: any
  page: number
  setPage: Dispatch<SetStateAction<number>>
  contractorsIsPreviousData: boolean
}