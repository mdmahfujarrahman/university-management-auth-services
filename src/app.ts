import express, { Application, Request, Response } from 'express'
import cors from 'cors'

// routes
import usersRouter from './app/modules/users/user.route'

const app: Application = express()

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
