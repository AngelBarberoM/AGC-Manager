import { AGCdbModel } from '../models/mysql/AGCdb.js'
import bcryptjs from 'bcryptjs'
// import jsonwebtoken from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

export async function registerAuth (req, res) {
  const username = req.body.username
  const email = req.body.email
  const password = req.body.password
  const confirmedPassword = req.body.confirmedPassword

  // Comprobamos si todos los campos del formulario han sido rellenados
  if (!username || !email || !password || !confirmedPassword) {
    return res.status(400).send({ status: 'Error', message: 'Los campos están incompletos' })
  }

  // Comprobamos si las contraseñas introducidas son la misma
  if (password !== confirmedPassword) {
    return res.status(400).send({ status: 'Error', message: 'Las contraseñas introducidas son incorrectas' })
  }

  // Ciframos la contraseña del usuario por su seguridad y privacidad
  const salt = await bcryptjs.genSalt(5)
  const hashPassword = await bcryptjs.hash(password, salt)

  // Comprobamos si existe usuario
  const existeUsuario = await AGCdbModel.getByEmail(email)

  if (existeUsuario) {
    return res.status(400).send({ status: 'Error', message: 'Este usuario ya exisite' })
  }

  // Creamos el nuevo usuario

  const newUser = await AGCdbModel.createUser({ username, email, password: hashPassword })

  // Comprobamos si el usuario ha sido creado correctamente
  if (newUser) {
    return res.status(201).send({ status: 'ok', message: `Usuario ${newUser.username} creado correctamente`, redirect: '/login' })
  } else {
    return res.status(400).send({ status: 'Error', message: `El usuario ${newUser.username} no ha sido creado correctamente ` })
  }
}

export async function loginAuth (req, res) {

}
