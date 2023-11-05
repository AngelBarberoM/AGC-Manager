import express from 'express'
import mysql from 'mysql2'

import { corsMiddleware } from './middlewares/cors.js'
import { pagesRouter } from './routes/pages.js'

import path from 'path'
import { fileURLToPath } from 'url'
const __dirname = path.dirname(fileURLToPath(import.meta.url))

// Express
const app = express()
app.use(express.urlencoded({ extended: 'false' }))

app.use(express.json())
app.use(express.static(path.join(__dirname, 'public', 'css')))
app.disable('x-powered-by')

// Middlewares
app.use(corsMiddleware())

// Rutas
app.use('/', pagesRouter)

// Errores
// Page not found 404
// app.use((req, res, next) => {
//   const err = new Error('Page not found')
//   err.status = 404
//   next(err)
// })

// app.use((err, req, res, next) => {
//   res.status(err.status || 500)
//   res.send(err.message)
// })

// Base de datos
const config = {
  host: 'localhost',
  port: '3306',
  user: 'root',
  password: '',
  database: 'agcdb'
}

const connection = mysql.createConnection(config)

// Comprobamos si la conexion con la base de datos es correcta
connection.connect()

const query = 'SELECT * FROM users'

connection.query(query, (error, results) => {
  if (error) {
    console.error('Error:', error)
  } else {
    console.log('Conexión con la base de datos correcta')
  }
  connection.end()
})

// Servidor
const PORT = process.env.PORT ?? 1234

app.listen(PORT, () => {
  console.log(`server listening on port http://localhost:${PORT}`)
})
