// import { AGCdbModel } from '../models/mysql/AGCdb.js'
import { UsersModel } from '../models/mysql/users.js'
import { validateUser } from '../schemas/AGC.js'
import bcryptjs from 'bcryptjs'

export async function registerAuth (req, res) {
  const username = req.body.username
  const email = req.body.email
  const password = req.body.password
  const confirmedPassword = req.body.confirmedPassword

  // Comprobamos si todos los campos del formulario han sido rellenados
  if (!username || !email || !password || !confirmedPassword) {
    return res.status(400).json({ status: 'Error', message: 'Los campos están incompletos' })
  }

  // Comprobamos el esquema del usuario
  const validate = validateUser(req.body)

  if (!validate.success) {
    // 422 Unprocessable Entity
    return res.status(400).json({ status: 'Error', message: 'Error User Schema' })
  }

  // Comprobamos si el numero de usuarios registrados en el sistema es mayor que 3,
  // ya que no tiene sentido que todo el mundo pueda registrarse
  const numberUsers = await UsersModel.getNumberUsers()

  if (numberUsers >= 3) {
    return res.status(429).json({ status: 'Error', message: 'Límite de usuarios alcanzado. No se pueden admitir más registros en este momento' })
  }

  // Comprobamos si las contraseñas introducidas son la misma
  if (password !== confirmedPassword) {
    return res.status(400).json({ status: 'Error', message: 'Las contraseñas introducidas son incorrectas' })
  }

  // Ciframos la contraseña del usuario por su seguridad y privacidad
  const salt = await bcryptjs.genSalt(5)
  const hashPassword = await bcryptjs.hash(password, salt)

  // Comprobamos si existe usuario
  const existeUsuario = await UsersModel.getUserByEmail({ email })

  if (existeUsuario) {
    return res.status(400).json({ status: 'Error', message: 'Este usuario ya exisite' })
  }

  // Creamos el nuevo usuario

  const newUser = await UsersModel.createUser({ input: { username, email, password: hashPassword } })

  // Comprobamos si el usuario ha sido creado correctamente
  if (newUser) {
    return res.status(201).json({ status: 'ok', message: `Usuario ${newUser.username} creado correctamente`, redirect: '/login' })
  } else {
    return res.status(400).json({ status: 'Error', message: `El usuario ${newUser.username} no ha sido creado correctamente ` })
  }
}
