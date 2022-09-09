import { FunctionComponent } from 'react'

export const Homeowners: FunctionComponent<HomeownersProps> = ({
  homeowners,
}) => {
  console.log(homeowners)
  return (
    <div>
      <h1>Test Homeowners Page</h1>
    </div>
  )
}

interface HomeownersProps {
  homeowners: any
}
