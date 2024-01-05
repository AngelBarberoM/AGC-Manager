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
    required_error: 'Password is required'
  }),
  confirmedPassword: z.string({ required_error: 'Confirmed password is required' }),
  tipoUsuario: z.enum(['admin', 'normal', 'autorizado'],
    {
      invalid_type_error: 'Tipo Servicio must be a enum',
      required_error: 'Tipo Servicio is required'
    })
})

// Esquema de cliente
const clientSchema = z.object({
  nombreEmpresa: z.string(),
  dni: z.string({
    invalid_type_error: 'DNI must be a string',
    required_error: 'DNI is required'
  }).length(9, { message: 'Must be exactly 9 characters long' }),
  nombre: z.string({
    invalid_type_error: 'Name must be a string',
    required_error: 'Name is required'
  }),
  apellidos: z.string({
    invalid_type_error: 'Apellidos must be a string',
    required_error: 'Apellidos is required'
  }),
  email: z.string({
    invalid_type_error: 'Email must be a string',
    required_error: 'Email is required'
  }).email({ required_error: 'String must be a Email format' }),
  telefono: z.string({
    invalid_type_error: 'Telefono must be a string',
    required_error: 'Telefono is required'
  }).length(9, { message: 'Must be exactly 9 characters long' }).regex(/^[6-7-9]\d{8}$/),
  fechaNacimiento: z.string({
    invalid_type_error: 'Fecha Nacimiento must be a string',
    required_error: 'Fecha Nacimiento is required'
  }).refine(value => new Date(value) >= new Date('1900-01-01'), {
    message: 'Fecha Nacimiento must be greater than 1900-01-01.'
  }).refine(value => new Date(value) <= new Date('2023-01-01'), {
    message: 'Fecha Nacimiento must be lower than 2023-01-01.'
  }),
  direccion: z.string({
    invalid_type_error: 'Direccion must be a string',
    required_error: 'Direccion is required'
  })
})

const serviceSchema = z.object({
  tipoServicio: z.enum(['ruta', 'transfer', 'escolar', 'excursion', 'turismo', 'largaDistancia', 'transportePublicoLocal', 'eventos', 'eventosEspeciales', 'eventosDeportivos', 'alquilerAutobus', 'transporteCrucero'],
    {
      invalid_type_error: 'Tipo Servicio must be a enum',
      required_error: 'Tipo Servicio is required'
    }),
  descripcion: z.string({
    invalid_type_error: 'Descripcion must be a string',
    required_error: 'Descripcion is required'
  }),
  fechaServicio: z.string({
    invalid_type_error: 'Fecha Servicio must be a string',
    required_error: 'Fecha Servicio is required'
  }).refine(value => new Date(value) >= new Date(), {
    message: 'Fecha Servicio must be greater than the current date.'
  }),
  fechaCreacion: z.string({
    invalid_type_error: 'Fecha Creacion must be a string',
    required_error: 'Fecha Creacion is required'
  }).refine(value => new Date(value) >= new Date('2020-01-01'), {
    message: 'Fecha Creacion must be greater than 2000-01-01.'
  }),
  clientId: z.string({
    required_error: 'clientId is required'
  })
})

const contractSchema = z.object({
  fechaInicio: z.string({
    invalid_type_error: 'Fecha Inicio must be a string',
    required_error: 'Fecha Inicio is required'
  }).refine(value => new Date(value) >= new Date('2000-01-01'), {
    message: 'Fecha Inicio must be greater than 2000-01-01.'
  }),
  fechaFin: z.string({
    invalid_type_error: 'Fecha Fin must be a string',
    required_error: 'Fecha Fin is required'
  }).refine(value => new Date(value) >= new Date('2000-01-01'), {
    message: 'Fecha Fin must be greater than Fecha Inicio.'
  }),
  sueldoHora: z.number({
    invalid_type_error: 'Sueldo Hora must be a number',
    required_error: 'Sueldo Hora is required'
  }).min(6.75, { message: 'Sueldo Hora must be greater or equal than 6.75' }),
  horasSemana: z.number({
    invalid_type_error: 'Horas Semana must be a int',
    required_error: 'Horas Semana is required'
  }).int()
})

const administrativeSchema = z.object({
  dni: z.string({
    invalid_type_error: 'DNI must be a string',
    required_error: 'DNI is required'
  }).length(9, { message: 'Must be exactly 9 characters long' }),
  nombre: z.string({
    invalid_type_error: 'Name must be a string',
    required_error: 'Name is required'
  }),
  apellidos: z.string({
    invalid_type_error: 'Apellidos must be a string',
    required_error: 'Apellidos is required'
  }),
  email: z.string({
    invalid_type_error: 'Email must be a string',
    required_error: 'Email is required'
  }).email({ required_error: 'String must be a Email format' }),
  telefono: z.string({
    invalid_type_error: 'Telefono must be a string',
    required_error: 'Telefono is required'
  }).length(9, { message: 'Must be exactly 9 characters long' }).regex(/^[6-7-9]\d{8}$/),
  sexo: z.enum(['masculino', 'femenino', 'otros'],
    {
      invalid_type_error: 'Sexo must be a enum',
      required_error: 'Sexo is required'
    }),
  fechaNacimiento: z.string({
    invalid_type_error: 'Fecha Nacimiento must be a string',
    required_error: 'Fecha Nacimiento is required'
  }).refine(value => new Date(value) >= new Date('1900-01-01'), {
    message: 'Fecha Nacimiento must be greater than 1900-01-01.'
  }).refine(value => new Date(value) <= new Date('2023-01-01'), {
    message: 'Fecha Nacimiento must be lower than 2023-01-01.'
  }),
  direccion: z.string({
    invalid_type_error: 'Direccion must be a string',
    required_error: 'Direccion is required'
  }),
  contractId: z.string({
    required_error: 'contractId is required'
  })
})

const driverSchema = z.object({
  dni: z.string({
    invalid_type_error: 'DNI must be a string',
    required_error: 'DNI is required'
  }).length(9, { message: 'Must be exactly 9 characters long' }),
  nombre: z.string({
    invalid_type_error: 'Name must be a string',
    required_error: 'Name is required'
  }),
  apellidos: z.string({
    invalid_type_error: 'Apellidos must be a string',
    required_error: 'Apellidos is required'
  }),
  email: z.string({
    invalid_type_error: 'Email must be a string',
    required_error: 'Email is required'
  }).email({ required_error: 'String must be a Email format' }),
  telefono: z.string({
    invalid_type_error: 'Telefono must be a string',
    required_error: 'Telefono is required'
  }).length(9, { message: 'Must be exactly 9 characters long' }).regex(/^[6-7-9]\d{8}$/),
  sexo: z.enum(['masculino', 'femenino', 'otros'],
    {
      invalid_type_error: 'Sexo must be a enum',
      required_error: 'Sexo is required'
    }),
  fechaNacimiento: z.string({
    invalid_type_error: 'Fecha Nacimiento must be a string',
    required_error: 'Fecha Nacimiento is required'
  }).refine(value => new Date(value) >= new Date('1900-01-01'), {
    message: 'Fecha Nacimiento must be greater than 1900-01-01.'
  }).refine(value => new Date(value) <= new Date('2023-01-01'), {
    message: 'Fecha Nacimiento must be lower than 2023-01-01.'
  }),
  direccion: z.string({
    invalid_type_error: 'Direccion must be a string',
    required_error: 'Direccion is required'
  }),
  permisoConducir: z.enum(['AM', 'A1', 'A2', 'A', 'B', 'C1', 'C', 'D1', 'D', 'BE', 'C1E', 'D1E', 'DE'],
    {
      invalid_type_error: 'Permiso Conducir must be a enum',
      required_error: 'Permiso Conducir is required'
    }),
  tarjetaCAP: z.enum(['Si', 'No'],
    {
      invalid_type_error: 'Tarjeta CAP must be a enum',
      required_error: 'Tarjeta CAP is required'
    }),
  tarjetaTacografo: z.enum(['Si', 'No'],
    {
      invalid_type_error: 'Tarjeta Tacograf must be a enum',
      required_error: 'Tarjeta Tacografo is required'
    }),
  certificadoAntecedentes: z.enum(['Si', 'No'],
    {
      invalid_type_error: 'Certificado Antecedentes must be a enum',
      required_error: 'Certificado Antecedentes is required'
    }),
  contractId: z.string({
    required_error: 'contractId is required'
  })
})
const busSchema = z.object({
  matricula: z.string({
    invalid_type_error: 'Matricula must be a string',
    required_error: 'Matricula is required'
  }).length(7, { message: 'Must be exactly 7 characters long' }).refine(value => /^[0-9]{4}[B-DF-HJ-NP-TV-Z]{3}$/.test(value), {
    message:
      'Matricula must have the format of four numbers followed by three letters (without vowels)'
  }),
  marca: z.string({
    invalid_type_error: 'Marca must be a string',
    required_error: 'Marca is required'
  }),
  modelo: z.string({
    invalid_type_error: 'Modelo must be a string',
    required_error: 'Modelo is required'
  }),
  plazas: z.number({
    invalid_type_error: 'Plazas must be a number',
    required_error: 'Plazas is required'
  }).int().min(9, { message: 'Plazas must be greater or equal than 9' }).max(90, { message: 'Plazas must be fewer or equal than 90' }),
  employeeId: z.string({
    required_error: 'employeeId is required'
  })
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

// Service
export function validateService (input) {
  return serviceSchema.safeParse(input)
}

export function validatePartialService (input) {
  return serviceSchema.partial().safeParse(input)
}

// Contract
export function validateContract (input) {
  return contractSchema.safeParse(input)
}

export function validatePartialContract (input) {
  return contractSchema.partial().safeParse(input)
}

// Administrative
export function validateAdministrative (input) {
  return administrativeSchema.safeParse(input)
}

export function validatePartialAdministrative (input) {
  return administrativeSchema.partial().safeParse(input)
}

// Driver
export function validateDriver (input) {
  return driverSchema.safeParse(input)
}

export function validatePartialDriver (input) {
  return driverSchema.partial().safeParse(input)
}

// Bus
export function validateBus (input) {
  return busSchema.safeParse(input)
}

export function validatePartialBus (input) {
  return busSchema.partial().safeParse(input)
}
