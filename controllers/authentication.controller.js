import bcryptjs from 'bcryptjs'
// import jsonwebtoken from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

export const usuarios = [{
  username: 'a',
  email: 'a@a.com',
  password: 'a'
}]

async function login (req, res) {

}
async function register (req, res) {
  const username = req.body.username
  const email = req.body.email
  const password = req.body.password
  const confirmedPassword = req.body.confirmedPassword

  if (!username || !email || !password || !confirmedPassword) {
    res.status(400).send({ status: 'Error', message: 'Los campos están incompletos' })
  }

  if (password !== confirmedPassword) {
    res.status(400).send({ status: 'Error', message: 'Las contraseñas introducidas no son la misma' })
  }

  const usuarioARevisar = usuarios.find(usuario => usuario.username === username)

  if (usuarioARevisar) {
    res.status(400).send({ status: 'Error', message: 'Este usuario ya existe' })
  }

  const salt = await bcryptjs.genSalt(5)
  const hashPassword = await bcryptjs.hash(password, salt)
  const nuevoUsuario = {
    username, email, password: hashPassword
  }
  usuarios.push(nuevoUsuario)

  return res.status(201).send({ status: 'ok', message: `Usuario ${nuevoUsuario.username} creado`, redirect: '/login' })
}

export const methods = {
  login,
  register
}
