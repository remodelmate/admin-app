import { interpolateParams, ROUTE_MAP } from '@utils/routes'
import Link from 'next/link'
import { Dispatch, FunctionComponent, SetStateAction } from 'react'
import { PaginateButtons } from '@components/shared'

const HomeownersTable: FunctionComponent<HomeownersTableProps> = ({
  homeownersData,
  page,
  setPage,
  homeownersIsPreviousData,
}) => {
  const { pageTotal, pageSize, homeownersCount, hasMore } = homeownersData

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
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Homeowner
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Email
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Phone
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    <span>Estimates</span>
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">View more</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {homeownersData.homeowners.map((homeowner: any) => {
                  return (
                    <tr
                      key={homeowner._id}
                      className="hover:bg-gray-100 transition-all"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="text-sm text-gray-900">
                          {`${homeowner.firstName} ${homeowner.lastName}`}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {homeowner.email}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {homeowner.phone.replace(
                            /^(\d{3})(\d{3})(\d{4})/,
                            '$1-$2-$3'
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          <span className=" align-middle">
                            {homeowner.estimates.length}
                          </span>
                        </div>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="text-indigo-600 ">
                          <Link
                            href={interpolateParams(
                              ROUTE_MAP.app.projectsDetail,
                              { homeownerId: homeowner._id }
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
        isPreviousData={homeownersIsPreviousData}
        page={page}
        setPage={setPage}
        pageSize={pageSize}
        totalCount={homeownersCount}
        pageTotal={pageTotal}
      />
    </div>
  )
}

export const Homeowners: FunctionComponent<HomeownersProps> = ({
  homeownersData,
  page,
  setPage,
  homeownersIsPreviousData,
}) => {
  return (
    <main className="flex-1 mb-10 sm:mb-12">
      <div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <h1 className="text-3xl font-semibold text-gray-900">Homeowners</h1>
        </div>
        <div className="max-w-7xl mx-auto p-4 sm:px-6 md:px-8">
          <HomeownersTable
            homeownersData={homeownersData}
            page={page}
            setPage={setPage}
            homeownersIsPreviousData={homeownersIsPreviousData}
          />
        </div>
      </div>
    </main>
  )
}

interface HomeownersProps {
  homeownersData: any
  page: number
  setPage: Dispatch<SetStateAction<number>>
  homeownersIsPreviousData: boolean
}

interface HomeownersTableProps {
  homeownersData: any
  page: number
  setPage: Dispatch<SetStateAction<number>>
  homeownersIsPreviousData: boolean
}
