import { createRequire } from 'node:module'

// Función que permite leer un ficher JSON
const require = createRequire(import.meta.url)

export const readJSON = (path) => require(path)
