import { dbConnect } from '@utils/mongodb'
import { NextApiRequest, NextApiResponse } from 'next'
import { Magic } from '@magic-sdk/admin'
import { Estimate } from 'models/estimate'

const magic = new Magic(process.env.MAGIC_SECRET_KEY)

type NextApiRequestWithEstimateInfo = Omit<NextApiRequest, 'body'> & {
  body: {
    id: string
    updatedContractors: Contractor[]
    activatedEnabled: boolean
    completedEnabled: boolean
  }
}

const handler = async (
  req: NextApiRequestWithEstimateInfo,
  res: NextApiResponse
) => {
  if (req.method === 'POST') {
    await dbConnect()

    const didToken = req.headers.authorization.substr(7)

    try {
      magic.token.validate(didToken)

      if (!req.body.id) {
        return res.status(400).send({ message: 'Request invalid' })
      }

      // Check if estimate has contractors field array, if not create it
      await Estimate.updateOne(
        { _id: req.body.id, contractors: { $exists: false } },
        { $set: { contractors: [] } }
      )

      const estimate = await Estimate.findById(req.body.id)

      const contractorIds = req.body.updatedContractors.map(
        contractor => contractor._id
      )

      await estimate.updateOne(
        { $set: { contractors: [...contractorIds] } },
        { new: true },
        (error: any, response: any) => {
          if (error) {
            console.log(error)
            return error
          }
          return response
        }
      )

      if (estimate.activated !== req.body.activatedEnabled) {
        estimate.activated = req.body.activatedEnabled
      }

      if (estimate.completed !== req.body.completedEnabled) {
        estimate.completed = req.body.completedEnabled
      }

      await estimate.save()

      res.status(200).json('Estimate updated successfully')
    } catch (error) {
      res.status(400).json({ message: 'Failed to update Estimate', error })
    }
  } else {
    res.setHeader('Allow', 'POST')
    res.status(405).end('Method Not Allowed')
  }
}

export default handler
