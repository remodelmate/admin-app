import { FunctionComponent } from 'react'

export const HomeownerDetail: FunctionComponent<HomeownerDetailProps> = ({
  homeowner,
}) => {
  console.log('HOMEOWNER', homeowner)
  return (
    <div>
      <h1>Homeowner Detail Component</h1>
    </div>
  )
}

interface HomeownerDetailProps {
  homeowner: Homeowner
}
