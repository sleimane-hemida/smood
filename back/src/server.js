import 'dotenv/config'
import express from 'express'
import { getDashboardAnalytics, trackVisit } from './services/analytics.js'
import { checkDatabaseConnection } from './services/database.js'
import { createContactMessage, listContactMessages } from './services/contactMessages.js'

const app = express()
const port = process.env.PORT || 3001

app.use(express.json())

app.get('/', (_request, response) => {
  response.json({
    name: 'smood-site-back',
    status: 'ok',
  })
})

app.get('/api/health', async (_request, response) => {
  const database = await checkDatabaseConnection()

  response.json({
    status: 'ok',
    service: 'backend',
    database,
  })
})

app.get('/api/dashboard', async (_request, response) => {
  try {
    const analytics = await getDashboardAnalytics(_request.query.month)

    response.json(analytics)
  } catch (error) {
    const statusCode = error.message.includes('invalide') ? 400 : 503

    response.status(statusCode).json({
      message: error.message,
    })
  }
})

app.post('/api/track-visit', async (request, response) => {
  try {
    const visit = await trackVisit(request.body)

    response.status(201).json({
      item: visit,
      message: 'Visite enregistree.',
    })
  } catch (error) {
    const statusCode = error.message.includes('obligatoires') ? 400 : 503

    response.status(statusCode).json({
      message: error.message,
    })
  }
})

app.get('/api/contact-messages', async (_request, response) => {
  try {
    const messages = await listContactMessages()

    response.json({
      items: messages,
      total: messages.length,
    })
  } catch (error) {
    response.status(503).json({
      message: error.message,
    })
  }
})

app.post('/api/contact-messages', async (request, response) => {
  try {
    const createdMessage = await createContactMessage(request.body)

    response.status(201).json({
      item: createdMessage,
      message: 'Message enregistre avec succes.',
    })
  } catch (error) {
    const statusCode = error.message.includes('obligatoires') ? 400 : 503

    response.status(statusCode).json({
      message: error.message,
    })
  }
})

if (process.env.VERCEL !== '1') {
  app.listen(port, () => {
    console.log(`Backend running on http://localhost:${port}`)
  })
}

export default app