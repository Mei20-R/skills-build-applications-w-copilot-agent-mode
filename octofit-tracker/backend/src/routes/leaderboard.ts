import { Router } from 'express'
import { ActivityModel } from '../models/activity.js'

const router = Router()

router.get('/', async (_request, response) => {
  const leaderboard = await ActivityModel.aggregate([
    { $group: { _id: '$userId', points: { $sum: '$points' }, activityCount: { $sum: 1 } } },
    { $lookup: { from: 'users', localField: '_id', foreignField: '_id', as: 'user' } },
    { $unwind: '$user' },
    { $sort: { points: -1, activityCount: -1 } },
    {
      $project: {
        _id: 0,
        userId: '$_id',
        name: '$user.name',
        points: 1,
        activityCount: 1,
      },
    },
  ])

  response.json(leaderboard.map((entry, index) => ({ rank: index + 1, ...entry })))
})

export default router