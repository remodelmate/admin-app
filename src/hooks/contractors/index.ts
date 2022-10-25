import { getUserToken } from '@utils/magic'
import { useQuery } from 'react-query'

export const getContractors = async (page = 0, filter = '') => {
  const token = await getUserToken()

  const body = JSON.stringify({ filter })

  return await fetch('/api/contractors/getAllContractors?page=' + page, {
    method: 'POST',
    body: body,
    headers: {
      authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  })
    .then(data => data.json())
    .catch(error => console.error(error))
}

export const useContractors = (
  page: number,
  filter: string,
  config?: Record<string, unknown>
) => {
  return useQuery(
    ['contractors', page, filter],
    () => getContractors(page, filter),
    {
      ...config,
    }
  )
}

export const getContractor = async (id: string) => {
  const token = await getUserToken()

  const body = JSON.stringify({ id })

  return await fetch('/api/contractors/getContractor', {
    method: 'POST',
    body: body,
    headers: {
      authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  })
    .then(data => data.json())
    .catch(error => console.error(error))
}

export const useContractor = (id: string, config?: Record<string, unknown>) => {
  return useQuery(['homeowner', id], () => getContractor(id), { ...config })
}

export const getContractorsDropdown = async () => {
  const token = await getUserToken()

  return await fetch('/api/contractors/getContractorsDropdown', {
    method: 'GET',
    headers: {
      authorization: `Bearer ${token}`,
    },
  })
    .then(data => data.json())
    .catch(error => console.error(error))
}

export const useContractorsDropdown = (config?: Record<string, unknown>) => {
  return useQuery('contractors-dropdown', () => getContractorsDropdown(), {
    ...config,
  })
}
