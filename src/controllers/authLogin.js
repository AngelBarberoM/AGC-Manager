// import { AGCdbModel } from '../models/mysql/AGCdb.js'
import { UsersModel } from '../models/mysql/users.js'
import { validatePartialUser } from '../schemas/AGC.js'
import bcryptjs from 'bcryptjs'
import jsonwebtoken from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

export async function loginAuth (req, res) {
  const email = req.body.email
  const password = req.body.password

  if (!email || !password) {
    return res.status(400).json({ status: 'Error', message: 'Los campos están incompletos' })
  }

  // Comprobamos el esquema del usuario
  const validate = validatePartialUser(req.body)

  if (!validate.success) {
    // 422 Unprocessable Entity
    return res.status(400).json({ status: 'Error', message: 'Error User Schema' })
  }

  // Comprobamos si existe usuario
  const user = await UsersModel.getUserByEmail({ email })

  if (!user) {
    return res.status(400).json({ status: 'Error', message: 'Correo Electrónico o contraseña incorrectos' })
  }
  // Comprobamos si la contraseña introducida es la correcta
  const loginCorrecto = await bcryptjs.compare(password, user.password)

  if (!loginCorrecto) {
    return res.status(400).json({ status: 'Error', message: 'Correo Electrónico o contraseña incorrectos' })
  }

  const token = jsonwebtoken.sign(
    { id: user.userId },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES }
  )

  const cookieOption = {
    expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
    path: '/'
  }
  res.cookie('jwt', token, cookieOption)
  res.json({ status: 'ok', message: 'Usuario loggeado', redirect: '/home' })
}
