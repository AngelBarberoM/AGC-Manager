-- Eliminar base de datos si existe
DROP DATABASE IF EXISTS AGCdb;

-- Crear base de datos
CREATE DATABASE AGCdb;

-- Usar 
USE AGCdb;

-- Eliminar tablas si existen
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS clients;
DROP TABLE IF EXISTS services;
DROP TABLE IF EXISTS employees;
DROP TABLE IF EXISTS administratives;
DROP TABLE IF EXISTS drivers;
DROP TABLE IF EXISTS bus;
DROP TABLE IF EXISTS contracts;

-- Crear tablas
CREATE TABLE users (
	userId BINARY(16) PRIMARY KEY DEFAULT(UUID_TO_BIN(UUID())),
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    tipoUsuario ENUM('admin','normal','autorizado') NOT NULL DEFAULT "normal",
    CONSTRAINT email_format_users CHECK( email LIKE '_%@_%._%')
);
CREATE TABLE clients (
	clientId BINARY(16) PRIMARY KEY DEFAULT(UUID_TO_BIN(UUID())),
    nombreEmpresa VARCHAR(50) NOT NULL,
    dni VARCHAR(9) UNIQUE NOT NULL,
    nombre VARCHAR(50) NOT NULL,
    apellidos VARCHAR(50) NOT NULL,
    email VARCHAR(50) UNIQUE NOT NULL,
    telefono VARCHAR(9) UNIQUE NOT NULL,
    fechaNacimiento DATE NOT NULL,
    direccion VARCHAR(100) NOT NULL,
    CONSTRAINT dni_format_clients CHECK (LENGTH(dni) = 9 AND REGEXP_LIKE(dni, '[0-9]{8}[A-Z]')),
    CONSTRAINT email_format_clients CHECK( email LIKE '_%@_%._%'),
    CONSTRAINT telefono_format_clients CHECK( LENGTH(telefono)=9 AND REGEXP_LIKE(telefono, '[6-7-9][0-9]{8}')),
    CONSTRAINT fecha_format_clients CHECK( fechaNacimiento > '1900-01-01' AND fechaNacimiento < '2023-01-01')
);
CREATE TABLE services (
	serviceId BINARY(16) PRIMARY KEY DEFAULT(UUID_TO_BIN(UUID())),
    tipoServicio ENUM('ruta','transfer','escolar','excursion','turismo','largaDistancia','eventos','eventosEspeciales','eventosDeportivos','alquilerAutobus','transporteCrucero') NOT NULL,
    descripcion VARCHAR(200) NOT NULL,
    fechaServicio DATE NOT NULL,
    fechaCreacion DATE DEFAULT(DATE(NOW())),
    clientId BINARY(16) DEFAULT NULL,
    FOREIGN KEY(clientId) REFERENCES clients(clientId) ON DELETE SET NULL
);
CREATE TABLE contracts (
	contractId BINARY(16) PRIMARY KEY DEFAULT(UUID_TO_BIN(UUID())),
    fechaInicio DATE NOT NULL,
    fechaFin DATE NOT NULL,
    sueldoHora DOUBLE NOT NULL DEFAULT(6.75),
    horasSemana INT NOT NULL DEFAULT(40),
    CONSTRAINT sueldoHoraMinimo CHECK (sueldoHora >= 6.75),
    CONSTRAINT sueldoMinimo CHECK (sueldoHora*horasSemana*4*14 >= 15120),
	CONSTRAINT horasSemanaMax CHECK (horasSemana = 40)
);
CREATE TABLE administratives (
	employeeId BINARY(16) PRIMARY KEY DEFAULT(UUID_TO_BIN(UUID())),
    dni VARCHAR(9) UNIQUE NOT NULL,
    nombre VARCHAR(50) NOT NULL,
    apellidos VARCHAR(50) NOT NULL,
    email VARCHAR(50) UNIQUE NOT NULL,
    telefono INT UNIQUE NOT NULL,
    sexo ENUM('masculino','femenino','otros') NOT NULL,
    fechaNacimiento DATE NOT NULL,
    direccion VARCHAR(100) NOT NULL,
    contractId BINARY(16) UNIQUE DEFAULT NULL,
    FOREIGN KEY(contractId) REFERENCES contracts(contractId) ON DELETE SET NULL,
    CONSTRAINT email_format_administratives CHECK( email LIKE '_%@_%._%'),
    CONSTRAINT telefono_format_administratives CHECK( LENGTH(telefono)=9 AND REGEXP_LIKE(telefono, '[6-7-9][0-9]{8}')),
    CONSTRAINT fecha_format_administratives CHECK( fechaNacimiento > '1900-01-01' AND fechaNacimiento < '2023-01-01'),
    CONSTRAINT dni_format_administratives CHECK (LENGTH(dni) = 9 AND REGEXP_LIKE(dni, '[0-9]{8}[A-Z]'))
);
CREATE TABLE drivers (
	employeeId BINARY(16) PRIMARY KEY DEFAULT(UUID_TO_BIN(UUID())),
    dni VARCHAR(9) UNIQUE NOT NULL,
    nombre VARCHAR(50) NOT NULL,
    apellidos VARCHAR(50) NOT NULL,
    email VARCHAR(50) UNIQUE NOT NULL,
    telefono INT UNIQUE NOT NULL,
    sexo ENUM('masculino','femenino','otros') NOT NULL,
    fechaNacimiento DATE NOT NULL,
    direccion VARCHAR(100) NOT NULL,
    permisoConducir ENUM('B','C1','C','D1','D','BE','C1E','D1E','DE') NOT NULL,
    tarjetaCAP ENUM('Si','No') NOT NULL,
    tarjetaTacografo ENUM('Si','No') NOT NULL,
    certificadoAntecedentes ENUM('Si','No') NOT NULL,
    contractId BINARY(16) UNIQUE DEFAULT NULL,
    FOREIGN KEY(contractId) REFERENCES contracts(contractId) ON DELETE SET NULL,
    CONSTRAINT email_format_drivers CHECK( email LIKE '_%@_%._%'),
    CONSTRAINT telefono_format_drivers CHECK( LENGTH(telefono)=9 AND REGEXP_LIKE(telefono, '[6-7-9][0-9]{8}')),
    CONSTRAINT fecha_format_drivers CHECK( fechaNacimiento > '1900-01-01' AND fechaNacimiento < '2023-01-01'),
    CONSTRAINT dni_format_drivers CHECK (LENGTH(dni) = 9 AND REGEXP_LIKE(dni, '[0-9]{8}[A-Z]'))
);
CREATE TABLE bus (
	busId BINARY(16) PRIMARY KEY DEFAULT(UUID_TO_BIN(UUID())),
    matricula VARCHAR(7) UNIQUE NOT NULL,
    marca VARCHAR(50) NOT NULL,
    modelo VARCHAR(50) NOT NULL,
    plazas INT NOT NULL,
    employeeId BINARY(16) DEFAULT NULL,
    FOREIGN KEY(employeeId) REFERENCES drivers(employeeId) ON DELETE SET NULL,
    CONSTRAINT matricula_format_bus CHECK (LENGTH(matricula) = 7 AND REGEXP_LIKE(matricula, '[0-9]{4}[B-DF-HJ-NP-TV-Z]{3}')),
    CONSTRAINT plazas_format_bus CHECK (plazas >= 9 AND plazas <= 90)
);