import { getUserToken } from '@utils/magic'
import { useQuery } from 'react-query'

export const getContractors = async (page = 0) => {
  const token = await getUserToken()

  return await fetch('/api/contractors/getAllContractors?page=' + page, {
    method: 'GET',
    headers: {
      authorization: `Bearer ${token}`,
    },
  })
    .then(data => data.json())
    .catch(error => console.error(error))
}

export const useContractors = (page: number, config?: any) => {
  return useQuery(['contractors', page], () => getContractors(page), {
    ...config,
  })
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

export const useContractor = (id: string, config?: any) => {
  return useQuery(['homeowner', id], () => getContractor(id), { ...config })
}
