import { getUserToken } from '@utils/magic'
import { useQuery } from 'react-query'

export const getEstimates = async (page = 0) => {
  const token = await getUserToken()

  return await fetch('/api/estimates/getAllEstimates?page=' + page, {
    method: 'GET',
    headers: {
      authorization: `Bearer ${token}`,
    },
  })
    .then(data => data.json())
    .catch(error => console.error(error))
}

export const useEstimates = (page: number, config?: any) => {
  return useQuery(['estimates', page], () => getEstimates(page), {
    ...config,
  })
}
