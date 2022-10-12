import { getUserToken } from '@utils/magic'
import { useMutation } from 'react-query'

export const updateMilestone = async ({
  updatedMilestone,
}: updateMilestoneRequest) => {
  const token = await getUserToken()

  const body = JSON.stringify({
    updatedMilestone,
  })

  const response = await fetch('/api/milestones/updateMilestone', {
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

export const useUpdateMilestone = (config?: Record<string, unknown>) => {
  return useMutation(
    async (request: updateMilestoneRequest) => await updateMilestone(request),
    { ...config }
  )
}

interface updateMilestoneRequest {
  updatedMilestone: Milestone
}
