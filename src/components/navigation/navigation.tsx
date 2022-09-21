import { FunctionComponent, ReactNode } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { ROUTE_MAP } from '@utils/routes'
import {
  CalculatorIcon,
  HomeModernIcon,
  WrenchScrewdriverIcon,
} from '@heroicons/react/24/outline'
import Link from 'next/link'
import clsx from 'clsx'

const navLinks = [
  {
    name: 'Homeowners',
    key: 'homeowners',
    href: ROUTE_MAP.app.homeowners,
    icon: HomeModernIcon,
  },
  {
    name: 'Estimates',
    key: 'estimates',
    href: ROUTE_MAP.app.estimates,
    icon: CalculatorIcon,
  },
  {
    name: 'Contractors',
    key: 'contractors',
    href: ROUTE_MAP.app.contractors,
    icon: WrenchScrewdriverIcon,
  },
]

export const Navigation: FunctionComponent<NavigationProps> = ({
  children,
}) => {
  const router = useRouter()

  const activePath = router.pathname.split('/')[1]

  return (
    <>
      {/* This example requires updating your template: <html class="h-full bg-gray-100">, <body class="h-full"> */}

      {/* STATIC SIDEBAR FOR DESKTOP */}
      <div className="flex w-64 flex-col fixed inset-y-0">
        {/* Sidebar component, swap this element with another sidebar if you like */}
        <div className="flex-1 flex flex-col min-h-0 border-r border-gray-200 bg-white">
          <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
            <div className="flex items-center flex-shrink-0 px-4">
              <Image
                className="h-8 w-auto"
                src="https://remodelmate-v2-local.s3.us-east-2.amazonaws.com/branding/logos/wordmark/svg/remodelmate-black.svg"
                alt="Remodelmate logo"
                height={32}
                width={150}
              />
            </div>
            <nav className="mt-5 flex-1 px-2 space-y-1">
              {navLinks.map(item => (
                <Link key={item.name} href={item.href}>
                  <div
                    className={clsx(
                      item.key === activePath
                        ? 'bg-gray-100 text-indigo-900'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                      'flex items-center px-2 py-2 text-sm font-medium rounded-md cursor-pointer'
                    )}
                  >
                    <item.icon
                      className={clsx(
                        item.key === activePath
                          ? 'text-indigo-500'
                          : 'text-gray-400 group-hover:text-gray-500',
                        'mr-3 flex-shrink-0 h-6 w-6'
                      )}
                      aria-hidden="true"
                    />
                    {item.name}
                  </div>
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>
      <div className="pl-64 flex flex-col flex-1 h-full">
        <main className="flex-1 h-full">
          <div className="py-6">
            <div className="max-w-full mx-auto px-4 sm:px-6 md:px-8">
              <div className="py-4">{children}</div>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}

interface NavigationProps {
  children: ReactNode
}
