import { UsersModel } from '../models/mysql/users.js'
import { validatePartialUser } from '../schemas/AGC.js'
import { isLoggedIn } from '../controllers/loggedIn.js'

import bcryptjs from 'bcryptjs'

export async function changePasswordAuth (req, res) {
  const { password, confirmedPassword, tipoUsuario } = req.body

  // Comprobamos si todos los campos del formulario han sido rellenados
  if (!password || !confirmedPassword || !tipoUsuario) {
    return res.status(400).json({ status: 'Error', message: 'Los campos están incompletos' })
  }

  // Comprobamos el esquema del usuario
  const validate = validatePartialUser(req.body)

  if (!validate.success) {
    return res.status(400).json({ status: 'Error', message: 'Error User Schema' })
  }

  const loggedIn = await isLoggedIn(req)

  // Comprobamos si existe usuario
  const existeUsuario = await UsersModel.getUserById({ id: loggedIn.userId })

  if (!existeUsuario) {
    return res.status(400).json({ status: 'Error', message: 'Este usuario no exisite' })
  }

  // Comprobamos si las contraseñas introducidas son la misma
  if (password !== confirmedPassword) {
    return res.status(400).json({ status: 'Error', message: 'Las contraseñas introducidas son incorrectas' })
  }

  const samePassword = await bcryptjs.compare(password, loggedIn.password)

  if (samePassword) {
    return res.status(400).json({ status: 'Error', message: 'La nueva contraseña es la misma que la anterior' })
  }

  // Ciframos la contraseña del usuario por su seguridad y privacidad
  const salt = await bcryptjs.genSalt(5)
  const hashPassword = await bcryptjs.hash(password, salt)

  // Actualizamos el usuario

  const updatedUser = await UsersModel.updateUser({ id: loggedIn.userId, input: { password: hashPassword, tipoUsuario } })

  if (updatedUser) {
    return res.status(201).json({ status: 'ok', message: `Usuario ${updatedUser.username} actualizado correctamente`, redirect: '/logout' })
  } else {
    return res.status(400).json({ status: 'Error', message: `El usuario ${updatedUser.username} no ha sido actualizado correctamente ` })
  }
}
