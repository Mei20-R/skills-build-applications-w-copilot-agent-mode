import express from 'express'
import { connectDatabase, database } from './config/database.js'
import activitiesRouter from './routes/activities.js'
import leaderboardRouter from './routes/leaderboard.js'
import teamsRouter from './routes/teams.js'
import usersRouter from './routes/users.js'

const app = express()
const port = Number(process.env.PORT ?? 8000)

app.use(express.json())
app.use('/api/users', usersRouter)
app.use('/api/activities', activitiesRouter)
app.use('/api/teams', teamsRouter)
app.use('/api/leaderboard', leaderboardRouter)

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok' })
})

app.get('/api/status', (_request, response) => {
  response.json({
    api: 'ok',
    database: database.readyState === 1 ? 'connected' : 'disconnected',
  })
})

const startServer = async () => {
  await connectDatabase()
  app.listen(port, () => {
    console.log(`OctoFit API listening on port ${port}`)
  })
}

startServer().catch((error) => {
  console.error('Unable to start OctoFit API:', error)
  process.exitCode = 1
})