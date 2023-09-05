// Purpose: User controller for user module

// Types
import { Request, Response } from 'express'

// Services
import userServices from './user.services'

const createUser = async (req: Request, res: Response) => {
  try {
    const { user } = req.body

    const result = await userServices.createUser(user)

    res.status(200).json({
      sucess: true,
      message: 'User created successfully',
      data: result,
    })
  } catch (error) {
    res.status(401).json({
      sucess: false,
      message: 'Fail to create new user',
    })
  }
}

export default {
  createUser,
}
