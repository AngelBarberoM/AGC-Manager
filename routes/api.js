import { Router } from 'express'
import { methods as authentication } from '../controllers/authentication.controller.js'

export const apiRouter = Router()

apiRouter.post('/login', authentication.login)
apiRouter.post('/register', authentication.register)
