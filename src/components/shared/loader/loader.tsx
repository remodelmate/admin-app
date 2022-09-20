import { ThreeDots } from 'assets'
import { FunctionComponent } from 'react'

export const Loader: FunctionComponent = () => {
  return (
    <div className="absolute left-0 top-0 w-full h-full md:pl-64">
      <div className="flex justify-center items-center h-full">
        <ThreeDots />
      </div>
    </div>
  )
}
