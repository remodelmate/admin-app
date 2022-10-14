import { dbConnect } from '@utils/mongodb'
import { NextApiRequest, NextApiResponse } from 'next'
import { Magic } from '@magic-sdk/admin'
import { Estimate } from 'models/estimate'
import { Milestone } from 'models/milestone'

const magic = new Magic(process.env.MAGIC_SECRET_KEY)

type NextApiRequestWithMilestoneId = Omit<NextApiRequest, 'body'> & {
  body: {
    id: string
  }
}

const handler = async (
  req: NextApiRequestWithMilestoneId,
  res: NextApiResponse
) => {
  if (req.method === 'DELETE') {
    await dbConnect()

    const didToken = req.headers.authorization.substr(7)

    const { id } = req.body

    try {
      magic.token.validate(didToken)

      if (!id) {
        return res.status(400).send({ message: 'Request invalid' })
      }

      const milestone = await Milestone.findById(id)
      const { _project, price } = milestone

      Estimate.findByIdAndUpdate(
        _project,
        { $pull: { milestones: id } },
        { new: true },
        (error, estimate) => {
          if (error) {
            console.log(error)
            return error
          }
          estimate.totalCost -= price
          estimate.remainingBalance -= price
          estimate.save()
        }
      )

      Milestone.findByIdAndDelete(id, {}, (error, response) => {
        if (error) {
          console.log(error)
          return error
        }
        return response
      })

      res.status(200).json('Milestone updated successfully')
    } catch (error) {
      res.status(400).json({ message: 'Failed to update Milestone', error })
    }
  } else {
    res.setHeader('Allow', 'DELETE')
    res.status(405).end('Method Not Allowed')
  }
}

export default handler
