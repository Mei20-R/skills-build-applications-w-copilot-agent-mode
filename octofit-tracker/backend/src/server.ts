import express from 'express'
import { connectDatabase, database } from './config/database.js'

const app = express()
const port = Number(process.env.PORT ?? 8000)

app.use(express.json())

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