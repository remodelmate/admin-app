import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { Simple } from './simple'

describe('simple', () => {
  it('should pass', () => {
    render(<Simple />)

    screen.getByText('Simple')
  })
})
