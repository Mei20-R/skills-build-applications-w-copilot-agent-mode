import { Router } from 'express'
import { Types } from 'mongoose'
import { TeamModel } from '../models/team.js'

const router = Router()

router.get('/', async (_request, response) => {
  const teams = await TeamModel.find().populate('members', 'name email').sort({ name: 1 }).lean()
  response.json(teams)
})

router.post('/', async (request, response) => {
  const { name, members = [] } = request.body as { name?: string; members?: string[] }

  if (!name?.trim() || !Array.isArray(members) || members.some((member) => !Types.ObjectId.isValid(member))) {
    response.status(400).json({ error: 'name and valid member ids are required' })
    return
  }

  try {
    const team = await TeamModel.create({ name, members })
    response.status(201).json(team)
  } catch (error) {
    if (error instanceof Error && 'code' in error && error.code === 11000) {
      response.status(409).json({ error: 'team name already exists' })
      return
    }

    response.status(500).json({ error: 'unable to create team' })
  }
})

export default router