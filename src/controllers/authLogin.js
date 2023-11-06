import { AGCdbModel } from '../models/mysql/AGCdb.js'
import bcryptjs from 'bcryptjs'
import jsonwebtoken from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

export async function loginAuth (req, res) {
  const username = req.body.username
  const password = req.body.password

  if (!username || !password) {
    return res.status(400).send({ status: 'Error', message: 'Los campos están incompletos' })
  }
  // Comprobamos si existe usuario
  const existeUsuario = await AGCdbModel.getUserByUsername(username)

  if (!existeUsuario) {
    return res.status(400).send({ status: 'Error', message: 'Usuario o contraseña incorrectos' })
  }

  // Comprobamos si la contraseña introducida es la correcta
  const loginCorrecto = await bcryptjs.compare(password, existeUsuario.password)

  if (!loginCorrecto) {
    return res.status(400).send({ status: 'Error', message: 'Usuario o contraseña incorrectos' })
  }

  const token = jsonwebtoken.sign(
    { id: existeUsuario.id },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES }
  )
  const cookieOption = {
    expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
    path: '/'
  }
  res.cookie('jwt', token, cookieOption)
  res.send({ status: 'ok', message: 'Usuario loggeado', redirect: '/home' })
}
