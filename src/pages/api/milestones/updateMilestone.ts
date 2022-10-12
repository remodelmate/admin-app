import { dbConnect } from '@utils/mongodb'
import { NextApiRequest, NextApiResponse } from 'next'
import { Magic } from '@magic-sdk/admin'
import { Estimate } from 'models/estimate'
import { Milestone } from 'models/milestone'

const magic = new Magic(process.env.MAGIC_SECRET_KEY)

type NextApiRequestWithMilestoneInfo = Omit<NextApiRequest, 'body'> & {
  body: {
    updatedMilestone: Milestone
  }
}

const handler = async (
  req: NextApiRequestWithMilestoneInfo,
  res: NextApiResponse
) => {
  if (req.method === 'POST') {
    await dbConnect()

    const didToken = req.headers.authorization.substr(7)

    const { updatedMilestone } = req.body

    try {
      magic.token.validate(didToken)

      if (!updatedMilestone._id) {
        return res.status(400).send({ message: 'Request invalid' })
      }

      const milestone = await Milestone.findById(updatedMilestone._id)
      const estimate = await Estimate.findById(updatedMilestone._project)

      if (
        milestone._contractor.toString() !== updatedMilestone._contractor._id
      ) {
        await milestone.updateOne({
          _contractor: updatedMilestone._contractor._id,
        })
      }

      if (milestone.name !== updatedMilestone.name) {
        milestone.name = updatedMilestone.name
      }

      if (milestone.description !== updatedMilestone.description) {
        milestone.description = updatedMilestone.description
      }

      if (milestone.price !== updatedMilestone.price) {
        // Remove old price from totalCost and remainingBalance
        estimate.totalCost -= milestone.price
        estimate.remainingBalance -= milestone.price

        // Update milestone price
        milestone.price = updatedMilestone.price

        // Update new price to totalCost and remainingBalance
        estimate.totalCost += updatedMilestone.price
        estimate.remainingBalance += updatedMilestone.price
      }

      if (
        milestone.contractorPercentage !== updatedMilestone.contractorPercentage
      ) {
        milestone.contractorPercentage = updatedMilestone.contractorPercentage
      }

      if (milestone.status !== updatedMilestone.status) {
        milestone.status = updatedMilestone.status
      }

      await milestone.save()
      await estimate.save()

      res.status(200).json('Milestone updated successfully')
    } catch (error) {
      res.status(400).json({ message: 'Failed to update Milestone', error })
    }
  } else {
    res.setHeader('Allow', 'POST')
    res.status(405).end('Method Not Allowed')
  }
}

export default handler
