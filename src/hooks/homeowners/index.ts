import { getUserToken } from '@utils/magic'
import { useQuery } from 'react-query'

const getHomeowners = async () => {
  const token = await getUserToken()

  return await fetch('/api/homeowners/getAllHomeowners', {
    method: 'GET',
    headers: {
      authorization: `Bearer ${token}`,
    },
  })
    .then(data => data.json())
    .catch(error => console.error(error))
}

export const useHomeowners = (config?: any) => {
  return useQuery('homeowners', getHomeowners, { ...config })
}
