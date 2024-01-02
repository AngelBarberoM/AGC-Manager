-- Usar 
USE AGCdb;

-- Diferentes consultas creadas
SELECT BIN_TO_UUID(userId), username, email, password, tipoUsuario FROM users;
SELECT BIN_TO_UUID(clientId), nombreEmpresa, dni, nombre, apellidos, email, telefono, fechaNacimiento, direccion FROM clients;
SELECT BIN_TO_UUID(serviceId), tipoServicio, descripcion, fechaServicio, fechaCreacion, BIN_TO_UUID(clientId) FROM services;
SELECT BIN_TO_UUID(contractId), fechaInicio, fechaFin, sueldoHora, horasSemana FROM contracts;
SELECT BIN_TO_UUID(employeeId), dni, nombre, apellidos, email, telefono, sexo, fechaNacimiento, direccion, BIN_TO_UUID(contractId) FROM administratives;
SELECT BIN_TO_UUID(employeeId), dni, nombre, apellidos, email, telefono, sexo, fechaNacimiento, direccion, permisoConducir, tarjetaCAP, tarjetaTacografo, certificadoAntecedentes, BIN_TO_UUID(contractId) FROM drivers;
SELECT BIN_TO_UUID(busId), matricula, marca, modelo, plazas, BIN_TO_UUID(employeeId) FROM bus;

-- Obtener todos los datos de los servicios y el nombre y apellidos del cliente que lo contrata
SELECT BIN_TO_UUID(s.serviceId), s.tipoServicio, s.descripcion, s.fechaServicio, s.fechaCreacion, CONCAT(c.nombre, ' ', c.apellidos) AS nombreApellidosCliente 
FROM services s NATURAL JOIN clients c;

-- Algunas consultas interesantes:
-- Todos los clientes con los servicios correspondientes
SELECT c.*, s.* FROM clients c
LEFT JOIN services s ON c.clientId = s.clientId;

-- Mostrar los clientes que han contratado un servicio escolar
SELECT c.* FROM clients c 
INNER JOIN services s ON c.clientId = s.clientId
WHERE s.tipoServicio = 'escolar';

-- Servicios creados a partir de diciembre de 2023
SELECT * FROM services WHERE fechaCreacion > '2023-12-01';

-- Calcular el sueldo total de los administrativos
SELECT a.*, c.sueldoHora * c.horasSemana * 4 AS sueldoTotal
FROM administratives a
INNER JOIN contracts c ON a.contractId = c.contractId;

-- Calcular el sueldo total de los conducores
SELECT d.*, c.sueldoHora * c.horasSemana * 4 AS sueldoTotal
FROM drivers d
INNER JOIN contracts c ON d.contractId = c.contractId;

-- Autobuses con conductor
SELECT b.*, d.* FROM bus b
LEFT JOIN drivers d ON b.employeeId = d.employeeId;

-- Numero de servicios por cada uno
SELECT tipoServicio, COUNT(*) AS totalServicios FROM services
GROUP BY tipoServicio;
