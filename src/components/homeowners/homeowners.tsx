import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import { interpolateParams, ROUTE_MAP } from '@utils/routes'
import clsx from 'clsx'
import Link from 'next/link'
import { Dispatch, FunctionComponent, SetStateAction } from 'react'

const HomeownersTable: FunctionComponent<HomeownersTableProps> = ({
  homeownersData,
  page,
  setPage,
  homeownersIsPreviousData,
}) => {
  const { pageTotal, pageSize, homeownersCount } = homeownersData

  const btnFocus = 'z-10 bg-blue-50 border-blue-500 text-blue-600'
  const noBtnFocus = 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'

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

      {/*Pagination Buttons*/}
      <div className="mt-6 flex items-center justify-between border-gray-200 bg-white px-4 py-3 sm:px-6">
        {/*MOBILE VIEW BUTTONS*/}
        <div className="flex flex-1 justify-between sm:hidden">
          <button
            className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            onClick={() => setPage(old => Math.max(old - 1, 0))}
            disabled={page === 1}
          >
            Previous
          </button>
          <button
            className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            onClick={() => {
              setPage(old => (homeownersData?.hasMore ? old + 1 : old))
            }}
            disabled={homeownersIsPreviousData || !homeownersData?.hasMore}
          >
            Next
          </button>
        </div>

        {/*DESKTOP VIEW BUTTONS*/}
        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700">
              Showing{' '}
              <span className="font-medium">
                {pageSize * page - pageSize + 1}
              </span>{' '}
              to{' '}
              <span className="font-medium">
                {pageSize * page > homeownersCount
                  ? homeownersCount
                  : pageSize * page}
              </span>{' '}
              of <span className="font-medium">{homeownersCount}</span> results
            </p>
          </div>
          <div>
            <nav
              className="isolate inline-flex -space-x-px rounded-md shadow-sm"
              aria-label="Pagination"
            >
              <button
                className="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
                onClick={() => setPage(old => Math.max(old - 1, 0))}
                disabled={page === 1}
              >
                <span className="sr-only">Previous</span>
                <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
              </button>

              {/* Current: "z-10 bg-indigo-50 border-indigo-500 text-indigo-600", Default: "bg-white border-gray-300 text-gray-500 hover:bg-gray-50" */}
              <button
                aria-current="page"
                className={clsx(
                  page === 1 ? btnFocus : noBtnFocus,
                  'relative inline-flex items-center border px-4 py-2 text-sm font-medium focus:z-20'
                )}
                onClick={() => setPage(1)}
              >
                1
              </button>
              {(page <= 3 || page >= pageTotal - 2) && (
                <button
                  className={clsx(
                    page === 2 ? btnFocus : noBtnFocus,
                    'relative inline-flex items-center border px-4 py-2 text-sm font-medium focus:z-20'
                  )}
                  onClick={() => setPage(2)}
                >
                  2
                </button>
              )}
              {(page <= 3 || page >= pageTotal - 2) && (
                <button
                  className={clsx(
                    page === 3 ? btnFocus : noBtnFocus,
                    'relative inline-flex items-center border px-4 py-2 text-sm font-medium focus:z-20'
                  )}
                  onClick={() => setPage(3)}
                >
                  3
                </button>
              )}

              {/* should only be visible if current page >= 4 */}
              {page >= 4 && (
                <span className="relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700">
                  ...
                </span>
              )}

              {/*middle set buttons*/}
              {page >= 4 && page <= pageTotal - 3 && (
                <div>
                  <button
                    className="relative hidden items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20 md:inline-flex"
                    onClick={() => setPage(page - 1)}
                  >
                    {page - 1}
                  </button>
                  <button
                    className={`${btnFocus}
                      relative inline-flex items-center border px-4 py-2 text-sm font-medium focus:z-20`}
                    onClick={() => setPage(page)}
                  >
                    {page}
                  </button>
                  <button
                    className="relative hidden items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20 md:inline-flex"
                    onClick={() => setPage(page + 1)}
                  >
                    {page + 1}
                  </button>
                </div>
              )}

              {/* should only be visible if the last 3 buttons are visible */}
              {page < pageTotal - 2 && (
                <span className="relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700">
                  ...
                </span>
              )}

              {(page >= pageTotal - 2 || page < 4) && (
                <button
                  className={clsx(
                    page === pageTotal - 2 ? btnFocus : noBtnFocus,
                    'relative inline-flex items-center border px-4 py-2 text-sm font-medium focus:z-20'
                  )}
                  onClick={() => setPage(pageTotal - 2)}
                >
                  {pageTotal - 2}
                </button>
              )}
              {(page >= pageTotal - 2 || page < 4) && (
                <button
                  className={clsx(
                    page === pageTotal - 1 ? btnFocus : noBtnFocus,
                    'relative inline-flex items-center border px-4 py-2 text-sm font-medium focus:z-20'
                  )}
                  onClick={() => setPage(pageTotal - 1)}
                >
                  {pageTotal - 1}
                </button>
              )}
              <button
                className={clsx(
                  page === pageTotal ? btnFocus : noBtnFocus,
                  'relative inline-flex items-center border px-4 py-2 text-sm font-medium focus:z-20'
                )}
                onClick={() => setPage(pageTotal)}
              >
                {pageTotal}
              </button>

              <button
                className="relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
                onClick={() => {
                  setPage(old => (homeownersData?.hasMore ? old + 1 : old))
                }}
                disabled={homeownersIsPreviousData || !homeownersData?.hasMore}
              >
                <span className="sr-only">Next</span>
                <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </nav>
          </div>
        </div>
      </div>
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
