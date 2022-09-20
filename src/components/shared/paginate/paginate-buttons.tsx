import clsx from 'clsx'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import { Dispatch, FunctionComponent, SetStateAction } from 'react'

/* Props info for this component. Most of these props come from the mongo api */
// hasMore - boolean property from mongo api: homeownersCount > page * pageSize
// isPreviousData - from react-query (maybe not needed if not using react-query)
// page - React state for page number
// setPage - React useState to set page number
// pageSize - Const set on MongoDB Api.
// totalCount - From MongoDB Api using the estimatedDocumentCount method.
// pageTotal - Calculated from MongoDB Api: Math.ceil(totalCount / pageSize)

export const PaginateButtons: FunctionComponent<PaginateButtonsProps> = ({
  hasMore,
  isPreviousData,
  page,
  setPage,
  pageSize,
  totalCount,
  pageTotal,
}) => {
  const btnFocus = 'z-10 bg-blue-50 border-blue-500 text-blue-600'
  const noBtnFocus = 'bg-white border-gray-300 text-gray-500 hover:bg-gray-100'

  return (
    <div className="mt-6 flex items-center justify-between border-gray-200 bg-white px-4 py-3 sm:px-6">
      {/*MOBILE VIEW BUTTONS*/}
      <div className="flex flex-1 justify-between sm:hidden">
        <button
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
          onClick={() => setPage(old => Math.max(old - 1, 0))}
          disabled={page === 1}
        >
          Previous
        </button>
        <button
          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
          onClick={() => {
            setPage(old => (hasMore ? old + 1 : old))
          }}
          disabled={isPreviousData || !hasMore}
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
              {pageSize * page > totalCount ? totalCount : pageSize * page}
            </span>{' '}
            of <span className="font-medium">{totalCount}</span> results
          </p>
        </div>
        <div>
          <nav
            className="isolate inline-flex -space-x-px rounded-md shadow-sm whitespace-nowrap"
            aria-label="Pagination"
          >
            <button
              className="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 focus:z-20"
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
            {2 <= pageTotal && (page <= 3 || page >= pageTotal - 2) && (
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
            {3 <= pageTotal && (page <= 3 || page >= pageTotal - 2) && (
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
            {4 <= pageTotal && pageTotal <= 6 && (
              <button
                className={clsx(
                  page === 4 ? btnFocus : noBtnFocus,
                  'relative inline-flex items-center border px-4 py-2 text-sm font-medium focus:z-20'
                )}
                onClick={() => setPage(4)}
              >
                4
              </button>
            )}
            {5 <= pageTotal && pageTotal <= 6 && (
              <button
                className={clsx(
                  page === 5 ? btnFocus : noBtnFocus,
                  'relative inline-flex items-center border px-4 py-2 text-sm font-medium focus:z-20'
                )}
                onClick={() => setPage(5)}
              >
                5
              </button>
            )}
            {6 <= pageTotal && pageTotal <= 6 && (
              <button
                className={clsx(
                  page === 6 ? btnFocus : noBtnFocus,
                  'relative inline-flex items-center border px-4 py-2 text-sm font-medium focus:z-20'
                )}
                onClick={() => setPage(6)}
              >
                6
              </button>
            )}

            {/* should only be visible if current page >= 4 and total pages is less than 6 */}
            {6 < pageTotal && page >= 4 && (
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

            {/* should only be visible if the last 3 buttons are visible and total pages is less than 6 */}
            {6 < pageTotal && page < pageTotal - 2 && (
              <span className="relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700">
                ...
              </span>
            )}

            {6 < pageTotal &&
              2 <= pageTotal &&
              (page >= pageTotal - 2 || page < 4) && (
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
            {6 < pageTotal && (page >= pageTotal - 2 || page < 4) && (
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
            {6 < pageTotal && (
              <button
                className={clsx(
                  page === pageTotal ? btnFocus : noBtnFocus,
                  'relative inline-flex items-center border px-4 py-2 text-sm font-medium focus:z-20'
                )}
                onClick={() => setPage(pageTotal)}
              >
                {pageTotal}
              </button>
            )}

            <button
              className="relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 focus:z-20"
              onClick={() => {
                setPage(old => (hasMore ? old + 1 : old))
              }}
              disabled={isPreviousData || !hasMore}
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </nav>
        </div>
      </div>
    </div>
  )
}

interface PaginateButtonsProps {
  hasMore: boolean
  isPreviousData: boolean
  page: number
  setPage: Dispatch<SetStateAction<number>>
  pageSize: number
  totalCount: number
  pageTotal: number
}
