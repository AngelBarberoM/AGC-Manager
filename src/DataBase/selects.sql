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