import { Navigation } from '@components/navigation'
import { FunctionComponent, ReactNode } from 'react'

export const Layout: FunctionComponent<LayoutProps> = ({ children }) => {
  return (
    <>
      <Navigation>{children}</Navigation>
    </>
  )
}

interface LayoutProps {
  children: ReactNode
}
