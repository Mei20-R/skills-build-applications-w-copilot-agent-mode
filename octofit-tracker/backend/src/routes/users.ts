import { Router } from 'express'
import { UserModel } from '../models/user.js'

const router = Router()

router.get('/', async (_request, response) => {
  const users = await UserModel.find().sort({ createdAt: -1 }).lean()
  response.json(users)
})

router.post('/', async (request, response) => {
  const { name, email, avatar } = request.body as { name?: string; email?: string; avatar?: string }

  if (!name?.trim() || !email?.trim()) {
    response.status(400).json({ error: 'name and email are required' })
    return
  }

  try {
    const user = await UserModel.create({ name, email, avatar })
    response.status(201).json(user)
  } catch (error) {
    if (error instanceof Error && 'code' in error && error.code === 11000) {
      response.status(409).json({ error: 'email already exists' })
      return
    }

    response.status(500).json({ error: 'unable to create user' })
  }
})

export default router