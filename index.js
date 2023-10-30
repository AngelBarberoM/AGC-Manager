import express from 'express'
import { corsMiddleware } from './middlewares/cors.js'
// Fix para __direname
import path from 'path'
import { fileURLToPath } from 'url'
const __dirname = path.dirname(fileURLToPath(import.meta.url))

const app = express()
// Express
app.use(express.json())
app.use(express.static(__dirname + '/public'))
app.disable('x-powered-by')

// MIDDLEWARES
app.use(corsMiddleware())

// RUTAS
app.get('/login', (req, res) => res.sendFile(__dirname + '/views/login.html'))
app.get('/register', (req, res) => res.sendFile(__dirname + '/views/register.html'))
app.get('/', (req, res) => res.sendFile(__dirname + '/views/home.html'))

// Server
const PORT = process.env.PORT ?? 1234

app.listen(PORT, () => {
  console.log(`server listening on port http://localhost:${PORT}`)
})
