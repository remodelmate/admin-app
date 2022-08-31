import { testFn } from '@utils/some-util'

describe('testFn', () => {
  it('should pass', () => {
    const res = testFn()

    expect(res).toBe('testFn')
  })
})
