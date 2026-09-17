import { Router } from 'express'
import { Types } from 'mongoose'
import { ActivityModel, ActivityType } from '../models/activity.js'

const router = Router()
const activityTypes: ActivityType[] = ['running', 'walking', 'strength']

router.get('/', async (request, response) => {
  const userId = request.query.userId as string | undefined
  const filter = userId && Types.ObjectId.isValid(userId) ? { userId } : {}
  const activities = await ActivityModel.find(filter).sort({ completedAt: -1 }).lean()
  response.json(activities)
})

router.post('/', async (request, response) => {
  const { userId, type, durationMinutes, distanceKm, points, completedAt } = request.body as {
    userId?: string
    type?: ActivityType
    durationMinutes?: number
    distanceKm?: number
    points?: number
    completedAt?: string
  }

  if (!userId || !Types.ObjectId.isValid(userId) || !type || !activityTypes.includes(type) || !durationMinutes) {
    response.status(400).json({ error: 'userId, type and durationMinutes are required' })
    return
  }

  const activity = await ActivityModel.create({
    userId,
    type,
    durationMinutes,
    distanceKm,
    points: points ?? durationMinutes,
    completedAt,
  })

  response.status(201).json(activity)
})

export default router