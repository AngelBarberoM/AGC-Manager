import { AGCdbModel } from '../models/mysql/AGCdb.js'
import jsonwebtoken from 'jsonwebtoken'

export async function onlyPublic (req, res, next) {
  const loggedIn = await isLoggedIn(req)

  if (!loggedIn) return next()
  else res.redirect('/')
}

export async function onlyLoggedIn (req, res, next) {
  const loggedIn = await isLoggedIn(req)

  if (loggedIn) return next()
  else res.redirect('/login')
}

async function isLoggedIn (req) {
  try {
    const cookieJWT = req.headers.cookie.split('; ').find(cookie => cookie.startsWith('jwt=')).slice(4)

    const decodedCookie = jsonwebtoken.verify(cookieJWT, process.env.JWT_SECRET)

    // Comprobamos si el usuario con id decodificado de la cookie existe
    const usuario = await AGCdbModel.getById(decodedCookie.id)

    if (usuario) {
      return true
    } else {
      return false
    }
  } catch {
    return false
  }
}
