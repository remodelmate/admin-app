import { testFn } from './some-util'

describe('testFn', () => {
  it('should pass', () => {
    const res = testFn()

    expect(res).toBe('testFn')
  })
})
