import { format } from 'date-fns'
import { formatPhoneNumber } from '@utils/phone'
import { FunctionComponent, ReactNode } from 'react'

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
    <div>
      <div>
        <section aria-labelledby="products-heading">
          <div className="space-y-8">
            <div className="bg-white border-t border-b border-gray-200 shadow-sm border rounded-lg px-4">
              <div className="py-6 sm:px-6 lg:grid lg:grid-cols-12">
                <div className="sm:flex lg:col-span-4">
                  <div className="">
                    <h3 className="text-bold font-medium text-gray-500">
                      <span>Homeowner</span>
                    </h3>
                    <p className="mt-2 m text-gray-900">{name}</p>
                  </div>
                </div>

                <div className="sm:flex lg:col-span-6">
                  <div className="mt-6 pr-6 lg:mt-0">
                    <h3 className="text-base font-medium text-gray-500">
                      <span>Email</span>
                    </h3>
                    <p className="mt-2  text-gray-900 break-words">{email}</p>
                  </div>
                </div>

                <div className="sm:flex lg:col-span-2">
                  <div className="mt-6 lg:mt-0">
                    <h3 className="text-base font-medium text-gray-500">
                      <span>Phone</span>
                    </h3>
                    <p className="mt-2  text-gray-900 whitespace-nowrap">
                      <a href={`tel:${phone}`}>{formatPhoneNumber(phone)}</a>
                    </p>
                  </div>
                </div>
              </div>

              <div className="pb-6 lg:pt-6 sm:px-6 lg:grid lg:grid-cols-12 ">
                <div className="sm:flex lg:col-span-4">
                  <div className="">
                    <h3 className="text-bold font-medium text-gray-500">
                      <span>Stripe Customer ID</span>
                    </h3>
                    <p className="mt-2 text-gray-900">
                      {stripeCustomerId ? stripeCustomerId : 'N/A'}
                    </p>
                  </div>
                </div>

                <div className="sm:flex lg:col-span-4">
                  <div className="mt-6 lg:mt-0">
                    <h3 className="text-base font-medium text-gray-500">
                      <span>Date Created</span>
                    </h3>
                    <p className="mt-2  text-gray-900">
                      {format(new Date(dateCreated), 'PP p')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export const HomeownerDetail: FunctionComponent<HomeownerDetailProps> = ({
  homeowner,
}) => {
  const { email, phone, dateCreated, stripeCustomerId } = homeowner
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

interface HomeownerDetailProps {
  homeowner: Homeowner
}
