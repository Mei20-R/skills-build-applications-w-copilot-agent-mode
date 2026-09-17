import { Router } from 'express'
import { WorkoutDifficulty, WorkoutModel } from '../models/workout.js'

const router = Router()
const difficulties: WorkoutDifficulty[] = ['beginner', 'intermediate', 'advanced']

router.get('/', async (request, response) => {
  const { type, difficulty } = request.query as { type?: string; difficulty?: WorkoutDifficulty }
  const filter = {
    ...(type ? { type } : {}),
    ...(difficulty && difficulties.includes(difficulty) ? { difficulty } : {}),
  }

  const workouts = await WorkoutModel.find(filter).sort({ difficulty: 1, title: 1 }).lean()
  response.json(workouts)
})

router.post('/', async (request, response) => {
  const { title, type, difficulty, durationMinutes, description } = request.body as {
    title?: string
    type?: string
    difficulty?: WorkoutDifficulty
    durationMinutes?: number
    description?: string
  }

  if (!title?.trim() || !type?.trim() || !difficulty || !difficulties.includes(difficulty) || !durationMinutes || !description?.trim()) {
    response.status(400).json({ error: 'title, type, difficulty, durationMinutes and description are required' })
    return
  }

  const workout = await WorkoutModel.create({ title, type, difficulty, durationMinutes, description })
  response.status(201).json(workout)
})

export default router