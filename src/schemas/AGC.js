import z from 'zod'

// Esquema de usuario
// Hay que añadir a password y comfirmedPassword: .min(8, { message: 'Password too short' })
const userSchema = z.object({
  username: z.string({
    invalid_type_error: 'Username must be a string',
    required_error: 'Username is required'
  }),
  email: z.string().email(),
  password: z.string({
    invalid_type_error: 'Password must be a string',
    required_error: 'Password is required.'
  }),
  confirmedPassword: z.string({ required_error: 'Confirmed password is required.' })
})

// Esquema de cliente
const clientSchema = z.object({
  nombreEmpresa: z.string(),
  dni: z.string({
    invalid_type_error: 'DNI must be a string',
    required_error: 'DNI is required.'
  }),
  nombre: z.string({
    invalid_type_error: 'Name must be a string',
    required_error: 'Name is required.'
  }),
  apellidos: z.string(),
  email: z.string({
    invalid_type_error: 'Email must be a string',
    required_error: 'Email is required.'
  }).email(),
  telefono: z.number({
    required_error: 'Phone number is required',
    invalid_type_error: 'Phone number must be a number'
  }).int().min(600000000).max(999999999)
})

const employeeSchema = z.object({

})

const busSchema = z.object({

})

const serviceSchema = z.object({

})

const typeServiceSchema = z.object({

})

// Funciones para validar los esquemas

// User
export function validateUser (input) {
  return userSchema.safeParse(input)
}

export function validatePartialUser (input) {
  return userSchema.partial().safeParse(input)
}

// Client
export function validateClient (input) {
  return clientSchema.safeParse(input)
}

export function validatePartialClient (input) {
  return clientSchema.partial().safeParse(input)
}

// Employee
export function validateEmployee (input) {
  return employeeSchema.safeParse(input)
}

export function validatePartialEmployee (input) {
  return employeeSchema.partial().safeParse(input)
}

// Bus
export function validateBus (input) {
  return busSchema.safeParse(input)
}

export function validatePartialBus (input) {
  return busSchema.partial().safeParse(input)
}

// Service
export function validateService (input) {
  return serviceSchema.safeParse(input)
}

export function validatePartialService (input) {
  return serviceSchema.partial().safeParse(input)
}

// Type Service
export function validateTypeService (input) {
  return typeServiceSchema.safeParse(input)
}

export function validatePartialTypeService (input) {
  return typeServiceSchema.partial().safeParse(input)
}
