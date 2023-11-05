import express from 'express'

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
app.use(express.static(path.join(__dirname, 'public', 'js')))
app.use(express.static(path.join(__dirname, 'public', 'img')))
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

// Servidor
const PORT = process.env.PORT ?? 1234

app.listen(PORT, () => {
  console.log(`server listening on port http://localhost:${PORT}`)
})
