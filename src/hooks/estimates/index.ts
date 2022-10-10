import { getUserToken } from '@utils/magic'
import { useMutation, useQuery } from 'react-query'

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

export const useEstimates = (
  page: number,
  config?: Record<string, unknown>
) => {
  return useQuery(['estimates', page], () => getEstimates(page), {
    ...config,
  })
}

export const getEstimate = async (id: string) => {
  const token = await getUserToken()

  const body = JSON.stringify({ id })

  return await fetch('/api/estimates/getEstimate', {
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

export const useEstimate = (id: string, config?: Record<string, unknown>) => {
  return useQuery(['estimate', id], () => getEstimate(id), { ...config })
}

export const updateEstimate = async ({
  id,
  updatedContractors,
  activatedEnabled,
  completedEnabled,
}: updateEstimateRequest) => {
  const token = await getUserToken()

  const body = JSON.stringify({
    id,
    updatedContractors,
    activatedEnabled,
    completedEnabled,
  })

  const response = await fetch('/api/estimates/updateEstimate', {
    method: 'POST',
    headers: {
      authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: body,
  })

  const apiRes = await response.json()

  if (!response.ok) {
    console.error('Error: ', apiRes.error.message, apiRes.message)
    throw apiRes.error
  }
}

export const useUpdateEstimate = (config?: Record<string, unknown>) => {
  return useMutation(
    async (request: updateEstimateRequest) => await updateEstimate(request),
    { ...config }
  )
}

interface updateEstimateRequest {
  id: string
  updatedContractors: Contractor[]
  activatedEnabled: boolean
  completedEnabled: boolean
}
