import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import jsonWebToken from 'jsonwebtoken'

import routes from './routes/routes.js'
import { dirname, join } from 'path'
import http from 'http'

const app = express()
const port = process.env.PORT
const server = http.createServer(app)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(cookieParser())

// Middleware to verify the user's token
app.use((request, response, next) => {
  const { token } = request.cookies
  if (token) {
    const { user_id } = jsonWebToken.verify(token, process.env.APP_SECRET)
    request.user_id = user_id
  }
  next()
})

// Middleware to handle CORS
// This is necessary because the frontend and backend are running on different ports
// if origin is not set, it means request is made by Next Server Pages
app.use(
  cors({
    credentials: true,
    origin: function (origin, callback) {
      if (
        !origin ||
        [
          'http://localhost:3000',
          'http://localhost:3001',
          'https://your-domain.fr', // TOFIX: replace with your domain
          'https://www.your-domain.fr', // TOFIX: replace with your domain
        ].indexOf(origin) !== -1
      ) {
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS'))
      }
    },
  })
)
app.use('/', routes)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
