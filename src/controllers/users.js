import bcryptjs from 'bcryptjs'
// import { AGCdbModel } from '../models/mysql/AGCdb.js'
import { UsersModel } from '../models/mysql/users.js'
import { validateUser, validatePartialUser } from '../schemas/AGC.js'

export class UsersController {
  getAllUsers = async (req, res) => {
    const users = await UsersModel.getAllUsers()

    if (!users) {
      return res.status(400).json({ status: 'Error', message: 'No existen usuarios para mostrar' })
    }
    res.json(users)
  }

  getUserById = async (req, res) => {
    const { id } = req.params

    const users = await UsersModel.getUserById({ id })

    if (!users) {
      return res.status(400).json({ status: 'Error', message: 'No existe usuario para mostrar' })
    }
    res.json(users)
  }

  createUser = async (req, res) => {
    const validate = validateUser(req.body)

    if (!validate.success) {
      return res.status(400).json({ error: JSON.parse(validate.error.message) })
      // return res.status(400).json({ status: 'Error', message: 'Error User Schema' })
    }
    const username = validate.data.username
    const email = validate.data.email
    const password = validate.data.password
    const confirmedPassword = validate.data.confirmedPassword
    const tipoUsuario = validate.data.tipoUsuario

    // Comprobamos si las contraseñas introducidas son la misma
    if (password !== confirmedPassword) {
      return res.status(400).json({ status: 'Error', message: 'Las contraseñas introducidas son incorrectas' })
    }

    // Ciframos la contraseña del usuario por su seguridad y privacidad
    const salt = await bcryptjs.genSalt(5)
    const hashPassword = await bcryptjs.hash(password, salt)

    // Comprobamos si existe usuario Email y Username
    const existeUsuarioUsername = await UsersModel.getUserByUsername({ username })

    if (existeUsuarioUsername) {
      return res.status(400).json({ status: 'Error', message: 'Este usuario ya exisite' })
    }

    const existeUsuarioEmail = await UsersModel.getUserByEmail({ email })

    if (existeUsuarioEmail) {
      return res.status(400).json({ status: 'Error', message: 'Este usuario ya exisite' })
    }

    // Creamos el nuevo usuario

    const newUser = await UsersModel.createUser({ input: { username, email, password: hashPassword, tipoUsuario } })

    // Comprobamos si el usuario ha sido creado correctamente
    if (newUser) {
      return res.status(201).json({ status: 'ok', message: `Usuario ${newUser.username} con id ${newUser.userId} creado correctamente`, redirect: '/home' })
    } else {
      return res.status(400).json({ status: 'Error', message: `El usuario ${validate.data.username} no ha sido creado correctamente ` })
    }
  }

  updateUser = async (req, res) => {
    const validate = validatePartialUser(req.body)

    if (!validate.success) {
      return res.status(400).json({ error: JSON.parse(validate.error.message) })
    }

    const { id } = req.params

    const users = await UsersModel.getUserById({ id })

    if (!users) {
      return res.status(400).json({ status: 'Error', message: 'No existe usuario para actualizar' })
    }

    if (validate.data.password !== validate.data.confirmedPassword) {
      return res.status(400).json({ status: 'Error', message: 'Las contraseñas introducidas son incorrectas' })
    }

    const updatedUser = await UsersModel.updateUser({ id, input: validate.data })

    if (!updatedUser) {
      return res.status(400).json({ status: 'Error', message: 'No se ha podido actualizar' })
    }

    return res.json({ status: 'ok', message: 'User updated', usuario: updatedUser })
  }

  deleteUser = async (req, res) => {
    const { id } = req.params

    const users = await UsersModel.getUserById({ id })

    if (!users) {
      return res.status(400).json({ status: 'Error', message: 'No existe usuario para eliminar' })
    }

    const deletedUser = await UsersModel.deleteUser({ id })

    if (deletedUser === false) {
      return res.status(404).json({ status: 'Error', message: 'User not found' })
    }

    return res.json({ status: 'ok', message: 'User deleted' })
  }
}
