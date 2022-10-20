import { getUserToken } from '@utils/magic'
import { useQuery } from 'react-query'

export const getHomeowners = async (page = 0, filter = '') => {
  const token = await getUserToken()

  const body = JSON.stringify({ filter })

  return await fetch('/api/homeowners/getAllHomeowners?page=' + page, {
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

export const useHomeowners = (
  page: number,
  filter: string,
  config?: Record<string, unknown>
) => {
  return useQuery(
    ['homeowners', page, filter],
    () => getHomeowners(page, filter),
    {
      ...config,
    }
  )
}

export const getHomeowner = async (id: string) => {
  const token = await getUserToken()

  const body = JSON.stringify({ id })

  return await fetch('/api/homeowners/getHomeowner', {
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

export const useHomeowner = (id: string, config?: Record<string, unknown>) => {
  return useQuery(['homeowner', id], () => getHomeowner(id), { ...config })
}
