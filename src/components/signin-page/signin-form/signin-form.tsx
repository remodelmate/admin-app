import { Formik, Form, useField } from 'formik'
import { useRouter } from 'next/router'
import { FunctionComponent, HTMLProps } from 'react'
import clsx from 'clsx'
import * as yup from 'yup'
import { checkUserExists } from '@hooks/auth'
import { ROUTE_MAP } from '@utils/routes'

const signinValidationSchema = () => {
  return yup.object().shape({
    email: yup
      .string()
      .email('must be a valid email')
      .required('Email address is required'),
  })
}

const signinInitialValues = {
  email: '',
}

const GenericFormField = ({ label, ...props }: HTMLProps<HTMLInputElement>) => {
  const [field, meta, _helpers] = useField(props.name)

  const hasError = meta.touched && meta.error

  const inputStyles = clsx(
    hasError
      ? 'border-red-300 text-red-900 placeholder-red-300  focus:ring-red-500 focus:border-red-500'
      : 'border-gray-300 placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500',
    'block w-full px-5 py-3 border focus:outline-none rounded-md shadow-sm',
    'text-base text-gray-900 placeholder-gray-500'
  )

  return (
    <div className="space-y-1">
      {label ? (
        <label
          htmlFor={props.name}
          className="block text-sm font-medium text-gray-700"
        >
          {label}
        </label>
      ) : null}

      <div>
        <input className={inputStyles} {...field} {...props} />
      </div>

      <div className=" block mt-2 text-sm text-red-600">
        {hasError ? <p>{meta.error}</p> : null}
      </div>
    </div>
  )
}

export const SigninForm: FunctionComponent<SigninFormProps> = ({
  createMagicUser,
}) => {
  const router = useRouter()

  return (
    <Formik
      initialValues={signinInitialValues}
      validationSchema={signinValidationSchema()}
      onSubmit={async (values, { setSubmitting }) => {
        setSubmitting(true)

        // validate email exists, we only do this because
        // as of now user should already exists
        const userExists = await checkUserExists({ email: values.email })

        if (userExists) {
          await createMagicUser(values.email)

          setSubmitting(false)

          router.push(ROUTE_MAP.app.homeowners)
        } else {
          router.push(ROUTE_MAP.auth.userDoesNotExist)
        }
      }}
    >
      {({ isSubmitting }) => {
        return (
          <div>
            <Form className="mt-12">
              <div className="min-w-0 flex-1 mb-4">
                <GenericFormField
                  name="email"
                  placeholder="Enter email address"
                  type="email"
                />
              </div>
              <div>
                <button
                  disabled={isSubmitting}
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent text-lg font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 tracking-widest"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit'}
                </button>
              </div>
            </Form>
          </div>
        )
      }}
    </Formik>
  )
}

interface SigninFormProps {
  createMagicUser: (email: string) => Promise<boolean>
}
