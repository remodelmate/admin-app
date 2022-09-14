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

export const useHomeowners = (page: any, config?: any) => {
  return useQuery(['homeowners', page], () => getHomeowners(page), {
    ...config,
  })
}
