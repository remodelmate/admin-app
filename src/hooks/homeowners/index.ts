import { getUserToken } from '@utils/magic'
import { useQuery } from 'react-query'

export const getHomeowners = async (page = 0) => {
  const token = await getUserToken()

  return await fetch('/api/homeowners/getAllHomeowners?page=' + page, {
    method: 'GET',
    headers: {
      authorization: `Bearer ${token}`,
    },
  })
    .then(data => data.json())
    .catch(error => console.error(error))
}

export const useHomeowners = (page: number, config?: any) => {
  return useQuery(['homeowners', page], () => getHomeowners(page), {
    ...config,
  })
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

export const useHomeowner = (id: string, config?: any) => {
  return useQuery(['homeowner', id], () => getHomeowner(id), { ...config })
}
