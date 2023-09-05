import express, { Application, Request, Response } from 'express'
import cors from 'cors'

// routes
import usersRouter from './app/modules/users/user.route'

// app
const app: Application = express()

// cors
app.use(cors())

// perser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Routes
app.use('/api/v1/users', usersRouter)

app.get('/', (req: Request, res: Response) => {
  res.send('Working')
})

export default app
