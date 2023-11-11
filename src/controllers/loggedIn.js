// import { AGCdbModel } from '../models/mysql/AGCdb.js'
import { UsersModel } from '../models/mysql/users.js'
import jsonwebtoken from 'jsonwebtoken'

export async function onlyPublic (req, res, next) {
  const loggedIn = await isLoggedIn(req)

  if (!loggedIn) return next()
  else res.status(400).redirect('/home')
  // else res.json({ status: 'Error', message: 'El usuario está loggeado', redirect: '/home' })
}

export async function onlyLoggedIn (req, res, next) {
  const loggedIn = await isLoggedIn(req)

  if (loggedIn) return next()
  else res.status(400).redirect('/login')
  // else res.json({ status: 'Error', message: 'El usuario no está loggeado', redirect: '/login' })
}

async function isLoggedIn (req) {
  try {
    const cookieJWT = req.headers.cookie.split('; ').find(cookie => cookie.startsWith('jwt=')).slice(4)

    const decodedCookie = jsonwebtoken.verify(cookieJWT, process.env.JWT_SECRET)

    // Comprobamos si el usuario con id decodificado de la cookie existe
    const id = decodedCookie.id

    const usuario = await UsersModel.getUserById({ id })

    if (usuario) {
      return true
    } else {
      return false
    }
  } catch {
    return false
  }
}
