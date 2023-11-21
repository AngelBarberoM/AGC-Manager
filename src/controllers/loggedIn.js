import { UsersModel } from '../models/mysql/users.js'
import jsonwebtoken from 'jsonwebtoken'

// Función que comprueba si un usuario con la sesión iniciada
// intenta acceder a una página solo disponible para los usuarios administradores
export async function onlyAdmin (req, res, next) {
  const loggedIn = await isLoggedIn(req)

  if (!loggedIn) res.redirect('/login')

  const { tipoUsuario } = loggedIn

  if (tipoUsuario === 'admin') return next()
  else if (tipoUsuario === 'normal') {
    res.redirect('/home')
  } else if (tipoUsuario === 'autorizado') {
    res.redirect('/changePassword')
  }
}

// Función que comprueba si un usuario con la sesión iniciada
// intenta acceder a una página solo disponible para los que no tienen sesión iniciada
export async function onlyPublic (req, res, next) {
  const loggedIn = await isLoggedIn(req)

  const { tipoUsuario } = loggedIn

  if (!loggedIn) return next()
  else if (tipoUsuario === 'normal' || tipoUsuario === 'admin') {
    res.redirect('/home')
  } else if (tipoUsuario === 'autorizado') {
    res.redirect('/changePassword')
  }
}

// Función que comprueba si el usuario que ha accedido al sistema esta autorizado para registrarse
export async function onlyPublicAutorized (req, res, next) {
  const loggedIn = await isLoggedIn(req)

  const { tipoUsuario } = loggedIn

  if (!loggedIn) res.redirect('/login')
  else if (tipoUsuario === 'autorizado') return next()
  else if (tipoUsuario === 'normal' || tipoUsuario === 'admin') res.redirect('/home')
}

// Función que comprueba si un usuario sin la sesión iniciada
// intenta acceder a una página solo disponible para los que tienen sesión iniciada
export async function onlyLoggedIn (req, res, next) {
  const loggedIn = await isLoggedIn(req)

  const { tipoUsuario } = loggedIn

  if (tipoUsuario === 'normal' || tipoUsuario === 'admin') return next()
  else if (tipoUsuario === 'autorizado') {
    res.redirect('/changePassword')
  } else res.redirect('/login')
}

// Función que comprueba si un usuario con la sesión iniciada intenta cerrar su sesión
export async function loggedOut (req, res, next) {
  const loggedIn = await isLoggedIn(req)

  const { tipoUsuario } = loggedIn

  if (tipoUsuario === 'normal' || tipoUsuario === 'admin' || tipoUsuario === 'autorizado') return next()
  else res.redirect('/login')
}

export async function isLoggedIn (req) {
  try {
    const cookieJWT = req.headers.cookie.split('; ').find(cookie => cookie.startsWith('jwt=')).slice(4)

    const decodedCookie = jsonwebtoken.verify(cookieJWT, process.env.JWT_SECRET)

    // Comprobamos si el usuario con id decodificado de la cookie existe
    const id = decodedCookie.id

    const usuario = await UsersModel.getUserById({ id })

    if (usuario) {
      return usuario
    } else {
      return false
    }
  } catch {
    return false
  }
}
