import { FunctionComponent, ReactNode, useState } from 'react'
import { format } from 'date-fns'
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline'
import { formatPhoneNumber } from '@utils/phone'
import { formatCurrency } from '@utils/currency'
import Link from 'next/link'
import { interpolateParams, ROUTE_MAP } from '@utils/routes'
import { EnlargeImage } from '@components/shared'
import { dateConversion } from '@utils/date'

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
  contractor,
}) => {
  const {
    category,
    companyName,
    companyAddress,
    profileImage,
    firstName,
    lastName,
    email,
    phone,
    contractorsLicense,
    insurancePolicy,
    backgroundCheckStatus,
    activated,
    stripeContractorId,
    localLicense,
  } = contractor
  const [imageClick, setImageClick] = useState(false)
  const [enlargeSrc, setEnlargeSrc] = useState('')

  const handleClick = (imageSrc: string) => {
    setEnlargeSrc(imageSrc)
    setImageClick(true)
  }

  return (
    <>
      <div className="overflow-hidden bg-white shadow sm:rounded-lg">
        <div className=" border-gray-200 px-4 py-5 sm:p-0">
          <dl className="sm:divide-y sm:divide-gray-200">
            <div className="py-5 sm:px-6">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Company
              </h3>
            </div>
            <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Category</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                {category
                  ? category.charAt(0).toUpperCase() + category.slice(1)
                  : 'N/A'}
              </dd>
            </div>
            <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Name</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                {companyName}
              </dd>
            </div>
            <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Address</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                <div className="text-sm text-gray-900">
                  {companyAddress?.street ?? ''}
                </div>
                <div className="text-sm text-gray-500">
                  {`${companyAddress?.city ?? ''}${companyAddress ? ',' : ''} ${
                    companyAddress?.state ?? ''
                  } ${companyAddress?.zip ?? ''}`}
                </div>
              </dd>
            </div>
            <div className="py-5 sm:px-6">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Contact Person
              </h3>
            </div>
            <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                Profile Image
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                <img
                  className="cursor-pointer object-cover"
                  src={profileImage}
                  alt="profileImage"
                  width="80"
                  height="80"
                  onClick={() => handleClick(profileImage)}
                  aria-hidden="true"
                />
              </dd>
            </div>
            <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Image URL</dt>
              <dd className="mt-1 text-sm text-blue-600 sm:col-span-2 sm:mt-0">
                {
                  <a
                    href={profileImage}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View
                  </a>
                }
              </dd>
            </div>
            <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Name</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                {`${firstName} ${lastName}`}
              </dd>
            </div>
            <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Email</dt>
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
            {contractorsLicense?.length > 0 && (
              <>
                <div className="py-5 sm:px-6">
                  <h3 className="text-lg font-medium leading-6 text-gray-900">
                    Contractor's License
                  </h3>
                </div>
                {contractorsLicense.map(license => {
                  return (
                    <div key={license.licenseNumber}>
                      <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">
                          Image
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                          <img
                            className="cursor-pointer object-cover"
                            src={license.licenseImage}
                            alt="licenseImage"
                            width="80"
                            height="80"
                            onClick={() => handleClick(license.licenseImage)}
                            aria-hidden="true"
                          />
                        </dd>
                      </div>
                      <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">
                          Image URL
                        </dt>
                        <dd className="mt-1 text-sm text-blue-600 sm:col-span-2 sm:mt-0">
                          {
                            <a
                              href={license.licenseImage}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              View
                            </a>
                          }
                        </dd>
                      </div>
                      <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">
                          Number
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                          {license.licenseNumber}
                        </dd>
                      </div>
                      <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">
                          State
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                          {license.state}
                        </dd>
                      </div>
                      <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">
                          Expiration Date
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                          {dateConversion(license.expirationDate)}
                        </dd>
                      </div>
                      <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">
                          Verified
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                          {license.licenseVerified ? (
                            <CheckCircleIcon className="h-5 w-5 text-green-500" />
                          ) : (
                            <XCircleIcon className="h-5 w-5 text-red-500" />
                          )}
                        </dd>
                      </div>
                      <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">
                          Status
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                          {license.status
                            ? license.status.charAt(0).toUpperCase() +
                              license.status.slice(1)
                            : 'N/A'}
                        </dd>
                      </div>
                    </div>
                  )
                })}
              </>
            )}
            {localLicense?.length > 0 && (
              <>
                <div className="py-5 sm:px-6">
                  <h3 className="text-lg font-medium leading-6 text-gray-900">
                    Local License
                  </h3>
                </div>
                {localLicense.map(license => {
                  return (
                    <div key={license._id}>
                      <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">
                          Image
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                          <img
                            className="cursor-pointer object-cover"
                            src={license.licenseImage}
                            alt="licenseImage"
                            width="80"
                            height="80"
                            onClick={() => handleClick(license.licenseImage)}
                            aria-hidden="true"
                          />
                        </dd>
                      </div>
                      <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">
                          Image URL
                        </dt>
                        <dd className="mt-1 text-sm text-blue-600 sm:col-span-2 sm:mt-0">
                          {
                            <a
                              href={license.licenseImage}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              View
                            </a>
                          }
                        </dd>
                      </div>
                      <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">
                          Company
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                          {license.companyName}
                        </dd>
                      </div>
                      <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">
                          City
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                          {license.licenseCity}
                        </dd>
                      </div>
                      <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">
                          License Code
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                          {license.licenseCode}
                        </dd>
                      </div>
                      <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">
                          License Number
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                          {license.licenseNumber}
                        </dd>
                      </div>
                      <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">
                          Commercial Activity License
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                          {license.commercialActivityLicense}
                        </dd>
                      </div>
                      <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">
                          Issued Date
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                          {dateConversion(license.dateIssued)}
                        </dd>
                      </div>
                      <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">
                          Expiration Date
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                          {dateConversion(license.dateExpire)}
                        </dd>
                      </div>
                      <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">
                          Verified
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                          {license.licenseVerified ? (
                            <CheckCircleIcon className="h-5 w-5 text-green-500" />
                          ) : (
                            <XCircleIcon className="h-5 w-5 text-red-500" />
                          )}
                        </dd>
                      </div>
                      <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">
                          Status
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                          {license.status
                            ? license.status.charAt(0).toUpperCase() +
                              license.status.slice(1)
                            : 'N/A'}
                        </dd>
                      </div>
                    </div>
                  )
                })}
              </>
            )}
            {insurancePolicy?.length > 0 && (
              <>
                <div className="py-5 sm:px-6">
                  <h3 className="text-lg font-medium leading-6 text-gray-900">
                    Insurance Policy
                  </h3>
                </div>

                {insurancePolicy.map(insurance => {
                  return (
                    <div key={insurance.policyNumber}>
                      <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">
                          Image
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                          <img
                            className="cursor-pointer object-cover"
                            src={insurance.insuranceImage}
                            alt="licenseImage"
                            width="80"
                            height="80"
                            onClick={() =>
                              handleClick(insurance.insuranceImage)
                            }
                            aria-hidden="true"
                          />
                        </dd>
                      </div>
                      <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">
                          Image URL
                        </dt>
                        <dd className="mt-1 text-sm text-blue-600 sm:col-span-2 sm:mt-0">
                          {
                            <a
                              href={insurance.insuranceImage}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              View
                            </a>
                          }
                        </dd>
                      </div>
                      <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">
                          Number
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                          {insurance.policyNumber}
                        </dd>
                      </div>
                      <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">
                          Expiration Date
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                          {dateConversion(insurance.expirationDate)}
                        </dd>
                      </div>
                      <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">
                          Verified
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                          {insurance.insuranceVerified ? (
                            <CheckCircleIcon className="h-5 w-5 text-green-500" />
                          ) : (
                            <XCircleIcon className="h-5 w-5 text-red-500" />
                          )}
                        </dd>
                      </div>
                      <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">
                          Status
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                          {insurance.status
                            ? insurance.status.charAt(0).toUpperCase() +
                              insurance.status.slice(1)
                            : 'N/A'}
                        </dd>
                      </div>
                    </div>
                  )
                })}
              </>
            )}
            <div className="py-5 sm:px-6">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Status
              </h3>
            </div>
            <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Activation</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                {activated ? (
                  <CheckCircleIcon className="h-5 w-5 text-green-500" />
                ) : (
                  <XCircleIcon className="h-5 w-5 text-red-500" />
                )}
              </dd>
            </div>
            <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                Background Check
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                {backgroundCheckStatus === 'passed' ? (
                  <CheckCircleIcon className="h-5 w-5 text-green-500" />
                ) : (
                  <XCircleIcon className="h-5 w-5 text-red-500" />
                )}
              </dd>
            </div>
            <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                Stripe Account
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                {stripeContractorId}
              </dd>
            </div>
          </dl>
        </div>
      </div>
      <EnlargeImage
        imageClick={imageClick}
        setImageClick={setImageClick}
        enlargeSrc={enlargeSrc}
        setEnlargeSrc={setEnlargeSrc}
      />
    </>
  )
}

const ProjectsSection: FunctionComponent<ProjectsSectionProps> = ({
  projects,
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
                {projects.map((project: Estimate) => {
                  return (
                    <tr
                      key={project._id}
                      className="hover:bg-gray-100 transition-all"
                    >
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {project.address.street}
                        </div>
                        <div className="text-sm text-gray-500">
                          {`${project.address.city}, ${project.address.state} ${project.address.zip}`}
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {project.activated ? (
                            <CheckCircleIcon className="h-5 w-5 text-green-500" />
                          ) : (
                            <XCircleIcon className="h-5 w-5 text-red-500" />
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {project.completed ? (
                            <CheckCircleIcon className="h-5 w-5 text-green-500" />
                          ) : (
                            <XCircleIcon className="h-5 w-5 text-red-500" />
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {formatCurrency(project.totalCost)}
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {format(new Date(project.dateCreated), 'PP p')}
                        </div>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="text-indigo-600 ">
                          <Link
                            href={interpolateParams(
                              ROUTE_MAP.app.estimateDetail,
                              { estimateId: project._id }
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

export const ContractorDetail: FunctionComponent<ContractorDetailProps> = ({
  contractor,
}) => {
  const { projects } = contractor

  return (
    <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 mb-16 sm:mb-20">
      <Section title={'Contractor Detail'}>
        <DetailSection contractor={contractor} />
      </Section>
      <Section title={"Contractor's Projects"}>
        <ProjectsSection projects={projects} />
      </Section>
    </main>
  )
}

interface SectionProps {
  title: string
  children: ReactNode
}

interface DetailSectionProps {
  contractor: Contractor
}

interface ProjectsSectionProps {
  projects: []
}

interface ContractorDetailProps {
  contractor: Contractor
}
