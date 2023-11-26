import { UsersModel } from '../models/mysql/users.js'
import { validateUser } from '../schemas/AGC.js'
import { isLoggedIn } from '../controllers/loggedIn.js'

import bcryptjs from 'bcryptjs'

export async function registerAuth (req, res) {
  const { username, email, password, confirmedPassword, tipoUsuario } = req.body

  // Comprobamos si todos los campos del formulario han sido rellenados
  if (!username || !email || !password || !confirmedPassword || !tipoUsuario) {
    return res.status(400).json({ status: 'Error', message: 'Los campos están incompletos' })
  }

  // Comprobamos el esquema del usuario
  const validate = validateUser(req.body)

  if (!validate.success) {
    // 422 Unprocessable Entity
    return res.status(400).json({ status: 'Error', message: 'Error User Schema' })
  }

  // Comprobamos si existe usuario Email y Username
  const existeUsuarioUsername = await UsersModel.getUserByUsername({ username })

  if (existeUsuarioUsername) {
    return res.status(400).json({ status: 'Error', message: 'Este usuario ya exisite' })
  }

  const existeUsuarioEmail = await UsersModel.getUserByEmail({ email })

  if (existeUsuarioEmail) {
    return res.status(400).json({ status: 'Error', message: 'Este usuario ya exisite' })
  }

  // Comprobamos si las contraseñas introducidas son la misma
  if (password !== confirmedPassword) {
    return res.status(400).json({ status: 'Error', message: 'Las contraseñas introducidas son incorrectas' })
  }

  // Ciframos la contraseña del usuario por su seguridad y privacidad
  const salt = await bcryptjs.genSalt(5)
  const hashPassword = await bcryptjs.hash(password, salt)

  // Creamos el nuevo usuario

  const newUser = await UsersModel.createUser({ input: { username, email, password: hashPassword, tipoUsuario } })

  // Comprobamos si el usuario ha sido creado correctamente y si se ha registrado con un usuario autorizado se elimina el usuario autorizado
  const loggedIn = await isLoggedIn(req)

  if (newUser && (loggedIn.tipoUsuario === 'autorizado')) {
    const deletedUser = await UsersModel.deleteUser({ id: loggedIn.userId })
    if (deletedUser) {
      console.log('Usuario eliminado correctamente')
      return res.status(201).json({ status: 'ok', message: `Usuario ${newUser.username} creado correctamente y usuario autorizado eliminado`, redirect: '/login' })
    } else {
      return res.status(404).json({ status: 'Error', message: 'User not found' })
    }
  } else if (newUser) {
    return res.status(201).json({ status: 'ok', message: `Usuario ${newUser.username} creado correctamente`, redirect: '/login' })
  } else {
    return res.status(400).json({ status: 'Error', message: `El usuario ${newUser.username} no ha sido creado correctamente ` })
  }
}
