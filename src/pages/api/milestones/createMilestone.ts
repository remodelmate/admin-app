import { dbConnect } from '@utils/mongodb'
import { NextApiRequest, NextApiResponse } from 'next'
import { Magic } from '@magic-sdk/admin'
import { Estimate } from 'models/estimate'
import { Milestone } from 'models/milestone'

const magic = new Magic(process.env.MAGIC_SECRET_KEY)

type NextApiRequestWithMilestoneInfo = Omit<NextApiRequest, 'body'> & {
  body: {
    newMilestone: {
      _project: Milestone['_project']
      _category: Milestone['_category']
      name: Milestone['name']
      description: Milestone['description']
      price: Milestone['price']
      contractorPercentage: Milestone['contractorPercentage']
      status: Milestone['status']
    }
    estimateId: Estimate['_id']
  }
}

const handler = async (
  req: NextApiRequestWithMilestoneInfo,
  res: NextApiResponse
) => {
  if (req.method === 'POST') {
    await dbConnect()

    const didToken = req.headers.authorization.substr(7)

    try {
      magic.token.validate(didToken)

      const { newMilestone } = req.body
      const { estimateId } = req.body

      if (!estimateId) {
        return res.status(400).send({ message: 'Request invalid' })
      }

      const milestone = new Milestone(newMilestone)
      milestone && (await milestone.save())

      const estimate = await Estimate.findById(estimateId)
      await estimate.milestones.push(milestone._id)

      estimate.totalCost += milestone.price
      estimate.remainingBalance += milestone.price

      await estimate.save()

      res.status(200).json('Milestone created successfully')
    } catch (error) {
      res.status(400).json({ message: 'Failed to create Milestone', error })
    }
  } else {
    res.setHeader('Allow', 'POST')
    res.status(405).end('Method Not Allowed')
  }
}

export default handler
