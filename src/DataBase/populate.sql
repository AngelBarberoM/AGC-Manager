-- Usar 
USE AGCdb;

-- Insertamos datos en las tablas
INSERT INTO users (userId, username, email, password, tipoUsuario) VALUES 
(UUID_TO_BIN(UUID()), "a", "a@a.com", "$2a$05$RXErlhYGHDuLHhG/LnfAXOj4NcnMaPrsJhX1V309U.eu00GfgWksC", "admin"),
(UUID_TO_BIN(UUID()), "hola", "hola@hola.com", "$2a$05$RXErlhYGHDuLHhG/LnfAXOj4NcnMaPrsJhX1V309U.eu00GfgWksC", "autorizado");

INSERT INTO clients (clientId, nombreEmpresa, dni, nombre, apellidos, email, telefono, fechaNacimiento, direccion) VALUES
(UUID_TO_BIN("ff37fc9e-7fac-11ee-920d-d0c5d3070aa6"), "Empresa1", "12345678A", "Carlos", "Gómez Muñoz", "carlos@gmail.com", "724623523", "2000-02-14", "C/Juan de Haro, 9, 3a, 12421"),
(UUID_TO_BIN("ff3804e5-7fac-11ee-920d-d0c5d3070aa6"), "Empresa2", "52352332A", "Juan", "Gonzalez Herrera ", "juan@gmail.com", "632243123", "1999-11-21", "C/Alfonso Herrera, 32, 42141"),
(UUID_TO_BIN("7bda38b6-9356-11ee-a3af-d0c5d3070aa6"), "Empresa3", "62423429W" ,"Pedro", "Román Pérez", "pedroroman@gmail.com", "711523987", "1999-03-23", "C/ Antonio Tomas, 42, 7, 41231"),
(UUID_TO_BIN("7bda3999-9356-11ee-a3af-d0c5d3070aa6"), "Empresa4", "81235152Y", "Carlos", "Gomez Viñales", "carlosgomez@gmail.com", "912387321", "1998-04-12", "C/ Adolfo Benitez, 23, 93412"),
(UUID_TO_BIN("7bda39ef-9356-11ee-a3af-d0c5d3070aa6"), "Empresa5", "98461748J", "Luis", "Alsina Gómez", "luisalsina@gmail.com", "712312412", "1997-05-15", "C/ Jose Arturo Fernandez, 52, 2, 72312"),
(UUID_TO_BIN("7bda3a3f-9356-11ee-a3af-d0c5d3070aa6"), "Empresa6", "51243162R", "Gerardo", "Hernandez", "gerardoher@gmail.com", "612315294", "2001-06-30", "C/ Centro, 41, 6E, 42343"),
(UUID_TO_BIN("7bda3a8a-9356-11ee-a3af-d0c5d3070aa6"), "Empresa7", "12365142H", "Angel", "Haro", "angelharo@gmail.com", "942342321", "2002-07-11", "C/ Palmera, 12, 93413"),
(UUID_TO_BIN("7bda3ad7-9356-11ee-a3af-d0c5d3070aa6"), "Empresa8", "54671294G", "Jose", "Luna", "joseluna@gmail.com", "724131441", "2000-08-03", "C/ Hita Bueno, 1, 8, 51236"),
(UUID_TO_BIN("7bda3b1c-9356-11ee-a3af-d0c5d3070aa6"), "Empresa9", "12314426K", "Miguel", "de la Fuente", "migueldela@gmail.com", "771312372", "1999-09-09", "C/ Bulevar, 6, 8C, 31241"),
(UUID_TO_BIN("7bda3b6a-9356-11ee-a3af-d0c5d3070aa6"), "Empresa10", "67234123S", "Ana", "Martínez", "anamartinez@gmail.com", "634512987", "1996-10-18", "Av. Libertad, 15, 3B, 82342"),
(UUID_TO_BIN("243c6a77-999f-11ee-a0c8-387a0e9dbbb9"), "Empresa11", "80336921D", "Lorenzo", "Salinas", "lorenzosali@gmail.com", "633478459", "2001-12-12", "C/ Ricardo Carapeto, 7, 4C, 51261" ),
(UUID_TO_BIN("7bda3bbb-9356-11ee-a3af-d0c5d3070aa6"), "Empresa12", "82341235V", "Elena", "García", "elenagarciia@gmail.com", "911223344", "1995-11-27", "C/ Gran Vía, 78, 5A, 12738"),
(UUID_TO_BIN("7bda3c01-9356-11ee-a3af-d0c5d3070aa6"), "Empresa13", "76543210X", "Francisco", "Díaz", "franciscodiaz@gmail.com", "655443322", "1994-12-05", "Plaza Mayor, 3, 2D, 17523");

INSERT INTO services (serviceId, tipoServicio, descripcion, fechaServicio, fechaCreacion, clientId) VALUES 
(UUID_TO_BIN("339b63e0-7fe3-11ee-83f6-d0c5d3070aa6"), "ruta", "Ruta Torremolinos-Málaga", "2023-11-20", "2023-11-10", UUID_TO_BIN("ff37fc9e-7fac-11ee-920d-d0c5d3070aa6")),
(UUID_TO_BIN("339b66e2-7fe3-11ee-83f6-d0c5d3070aa6"), "escolar", "Transporte escolar colegio Almudena", "2023-12-20", "2023-11-15", UUID_TO_BIN("ff3804e5-7fac-11ee-920d-d0c5d3070aa6")),
(UUID_TO_BIN("51c04e18-9c0a-11ee-bdce-5e4951bbb96b"), "excursion", "Excursión Barcelona", "2024-01-18", "2023-12-15", UUID_TO_BIN("7bda38b6-9356-11ee-a3af-d0c5d3070aa6")),
(UUID_TO_BIN("5647b5a5-9c0a-11ee-bdce-5e4951bbb96b"), "turismo", "Transporte El Rincón", "2023-12-28", "2023-11-10", UUID_TO_BIN("7bda3999-9356-11ee-a3af-d0c5d3070aa6")),
(UUID_TO_BIN("5ada61a5-9c0a-11ee-bdce-5e4951bbb96b"), "largaDistancia", "Transporte París", "2023-12-05", NULL, UUID_TO_BIN("7bda39ef-9356-11ee-a3af-d0c5d3070aa6")),
(UUID_TO_BIN("60116c7b-9c0a-11ee-bdce-5e4951bbb96b"), "transportePublicoLocal", "Marbella-Torre del Mar", "2024-02-14", "2023-11-30", UUID_TO_BIN("7bda3a3f-9356-11ee-a3af-d0c5d3070aa6")),
(UUID_TO_BIN("6414bca2-9c0a-11ee-bdce-5e4951bbb96b"), "eventos", "Transporte Feria Málaga", "2024-01-29", "2023-12-11", UUID_TO_BIN("7bda3a8a-9356-11ee-a3af-d0c5d3070aa6")),
(UUID_TO_BIN("672a88a3-9c0a-11ee-bdce-5e4951bbb96b"), "eventosEspeciales", "Transporte Latin Grammys", "2023-11-16", NULL, UUID_TO_BIN("7bda3ad7-9356-11ee-a3af-d0c5d3070aa6")),
(UUID_TO_BIN("6eb0306f-9c0a-11ee-bdce-5e4951bbb96b"), "eventosDeportivos", "Transporte Málaga CF-Córdoba CF", "2023-12-12", "2023-10-23", UUID_TO_BIN("7bda3b1c-9356-11ee-a3af-d0c5d3070aa6")),
(UUID_TO_BIN("7474c7d3-9c0a-11ee-bdce-5e4951bbb96b"), "alquilerAutobus", "Alquiler Junta Andalucía", "2023-10-25", NULL, UUID_TO_BIN("7bda3b6a-9356-11ee-a3af-d0c5d3070aa6")),
(UUID_TO_BIN("78b1a0f7-9c0a-11ee-bdce-5e4951bbb96b"), "transporteCrucero", "Crucero 5stars Caribean", "2024-01-09", "2023-09-11", UUID_TO_BIN("243c6a77-999f-11ee-a0c8-387a0e9dbbb9")),
(UUID_TO_BIN("9e41929c-9c0a-11ee-bdce-5e4951bbb96b"), "transfer", "Transfer Granada", "2024-02-13", "2023-05-01", UUID_TO_BIN("7bda3bbb-9356-11ee-a3af-d0c5d3070aa6")),
(UUID_TO_BIN("a126cc86-9c0a-11ee-bdce-5e4951bbb96b"), "escolar", "Transporte Escolar colegio Los Olivos", "2024-02-22", "2023-10-22", UUID_TO_BIN("7bda3c01-9356-11ee-a3af-d0c5d3070aa6"));

INSERT INTO contracts (contractId, fechaInicio, fechaFin, sueldoHora, horasSemana) VALUES
(UUID_TO_BIN("9f0310e1-7fe3-11ee-83f6-d0c5d3070aa6"), "2015-05-01", "2030-12-31", "7", 40),
(UUID_TO_BIN("262c9439-9c0c-11ee-bdce-5e4951bbb96b"), "2017-10-01", "2028-10-31", "7.5", 40),
(UUID_TO_BIN("d5ff8c8a-9c0c-11ee-bdce-5e4951bbb96b"), "2018-09-01", "2026-09-30", "9", 40),
(UUID_TO_BIN("36ef83bf-9c0c-11ee-bdce-5e4951bbb96b"), "2022-03-01", "2029-03-31", "8", 40),
(UUID_TO_BIN("3a92789b-9c0c-11ee-bdce-5e4951bbb96b"), "2021-11-01", "2050-11-30", "7.75", 40),
(UUID_TO_BIN("9f03157e-7fe3-11ee-83f6-d0c5d3070aa6"), "2022-02-01", "2027-12-31", "6.75", 40),
(UUID_TO_BIN("9f03169a-7fe3-11ee-83f6-d0c5d3070aa6"), "2009-09-01", "2040-12-31", "8.25", 40),
(UUID_TO_BIN("fc755f17-9c0d-11ee-bdce-5e4951bbb96b"), "2022-01-01", "2029-01-31", "8", 40),
(UUID_TO_BIN("062ffe42-9c0e-11ee-bdce-5e4951bbb96b"), "2021-05-01", "2050-05-31", "7.75", 40),
(UUID_TO_BIN("0ce79029-9c0e-11ee-bdce-5e4951bbb96b"), "2022-07-01", "2027-07-31", "6.75", 40),
(UUID_TO_BIN("13e4db43-9c0e-11ee-bdce-5e4951bbb96b"), "2019-08-01", "2040-08-31", "8.25", 40);

INSERT INTO administratives (employeeId, dni, nombre, apellidos, email, telefono, sexo, fechaNacimiento, direccion, contractId) VALUES
(UUID_TO_BIN("b1e8f663-7fad-11ee-920d-d0c5d3070aa6"), "54234212J", "Arturo", "Fernandez Cabrero", "arturo@gmail.com", "623412381", "masculino", "1983-06-30", "C/Obispo, 5, 2a, 32123", UUID_TO_BIN("9f0310e1-7fe3-11ee-83f6-d0c5d3070aa6")),
(UUID_TO_BIN("f6df1c34-8b90-11ee-a3af-d0c5d3070aa6"), "92465326Y", "María", "Caballero", "mariacab@gmail.com", "723452335", "femenino", "1985-09-05", "C/ Julian Gómez, 66, 2D, 72813", UUID_TO_BIN("262c9439-9c0c-11ee-bdce-5e4951bbb96b")),
(UUID_TO_BIN("8b0a6ad2-935a-11ee-a3af-d0c5d3070aa6"), "17318376F", "Eugenia", "Viescas", "euviescas@gmail.com", "632612312", "femenino", "1991-07-15", "C/ San Sebastian, 44, 8, 12631", UUID_TO_BIN("d5ff8c8a-9c0c-11ee-bdce-5e4951bbb96b")),
(UUID_TO_BIN("8b0a6b94-935a-11ee-a3af-d0c5d3070aa6"), "94887639L", "Irene", "Romero", "ireneerom@gmail.com", "712416231", "femenino", "1996-06-25", "C/ San Julian, 12, 5C, 12821", UUID_TO_BIN("36ef83bf-9c0c-11ee-bdce-5e4951bbb96b"));

INSERT INTO drivers (employeeId, dni, nombre, apellidos, email, telefono, sexo, fechaNacimiento, direccion, permisoConducir, tarjetaCAP, tarjetaTacografo, certificadoAntecedentes, contractId) VALUES
(UUID_TO_BIN("b1e8fe07-7fad-11ee-920d-d0c5d3070aa6"), "98294381F", "Jorge", "Hernandez Vidal", "jorge@gmail.com", "732442323", "masculino", "2004-04-09", "C/Tramuntana, 21, 2a, 12341", "D1", "Si", "Si", "No", UUID_TO_BIN("9f03157e-7fe3-11ee-83f6-d0c5d3070aa6")),
(UUID_TO_BIN("b1e9004b-7fad-11ee-920d-d0c5d3070aa6"), "89124981S", "Martin", "Luna Ramos", "martin@gmail.com", "942342212", "masculino", "1976-05-1", "C/Gonzalez Torres, 32, 53252", "D", "Si", "Si", "Si", UUID_TO_BIN("9f03169a-7fe3-11ee-83f6-d0c5d3070aa6")),
(UUID_TO_BIN("034c589d-8b91-11ee-a3af-d0c5d3070aa6"), "63452243H", "Alberto", "Gomez", "alberto@gmail.com", "734535213", "masculino", "1993-06-28", "C/ San Augusto, 12, 73122", "D1", "Si", "Si", "Si", UUID_TO_BIN("fc755f17-9c0d-11ee-bdce-5e4951bbb96b")),
(UUID_TO_BIN("8b0bfdc1-935a-11ee-a3af-d0c5d3070aa6"), "67315236F", "Manuela", "Durán", "manuela@gmail.com", "612351631", "femenino", "1999-05-09", "C/ Santo Tomás, 9, 12536", "D", "Si", "Si", "No", UUID_TO_BIN("062ffe42-9c0e-11ee-bdce-5e4951bbb96b")),
(UUID_TO_BIN("8b0bfe76-935a-11ee-a3af-d0c5d3070aa6"), "41231536B", "Diego", "Tabas", "diego@gmail.com", "723162351", "femenino", "1996-04-01", "C/ Noche Buena, 12, 31, 33711", "D1", "Si", "Si", "Si", UUID_TO_BIN("0ce79029-9c0e-11ee-bdce-5e4951bbb96b")),
(UUID_TO_BIN("8b0bfec9-935a-11ee-a3af-d0c5d3070aa6"), "32153126C", "Sara", "Rueda", "sara@gmail.com", "923852934", "femenino", "1994-03-04", "C/ San Alberto, 62, 6A, 12531", "D", "Si", "Si", "Si", UUID_TO_BIN("13e4db43-9c0e-11ee-bdce-5e4951bbb96b")),
(UUID_TO_BIN("8b0a6be7-935a-11ee-a3af-d0c5d3070aa6"), "76123515B", "Tomás", "Llanos", "tomas@gmail.com", "923472391", "masculino", "1999-05-31", "C/ Santa Teresa, 9, 51231", "D1", "Si", "Si", "No", UUID_TO_BIN("3a92789b-9c0c-11ee-bdce-5e4951bbb96b"));

INSERT INTO bus (busId, matricula, marca, modelo, plazas, employeeId) VALUES
(UUID_TO_BIN("de63a8d2-7fe4-11ee-83f6-d0c5d3070aa6"), "2345GLK", "Iveco", "Crossway", 53, UUID_TO_BIN("b1e8fe07-7fad-11ee-920d-d0c5d3070aa6")),
(UUID_TO_BIN("de63b036-7fe4-11ee-83f6-d0c5d3070aa6"), "7123MNY", "Volvo", "9900", 75, UUID_TO_BIN("b1e9004b-7fad-11ee-920d-d0c5d3070aa6")),
(UUID_TO_BIN("3a7eef05-9c27-11ee-bdce-5e4951bbb96b"), "3423HLM", "Mercedes", "Tourismo", 45, UUID_TO_BIN("034c589d-8b91-11ee-a3af-d0c5d3070aa6")),
(UUID_TO_BIN("3e0503ab-9c27-11ee-bdce-5e4951bbb96b"), "7481LFG", "Volvo", "9700", 53, UUID_TO_BIN("8b0bfdc1-935a-11ee-a3af-d0c5d3070aa6")),
(UUID_TO_BIN("7b947f62-9c2b-11ee-bdce-5e4951bbb96b"), "4812JRT", "King Long", "Serie U", 40, UUID_TO_BIN("8b0bfe76-935a-11ee-a3af-d0c5d3070aa6")),
(UUID_TO_BIN("43c5cefd-9c27-11ee-bdce-5e4951bbb96b"), "9845MBD", "Volvo", "9900", 50, UUID_TO_BIN("8b0bfec9-935a-11ee-a3af-d0c5d3070aa6")),
(UUID_TO_BIN("463819ab-9c27-11ee-bdce-5e4951bbb96b"), "7385LTM", "King Long", "Serie U", 55, UUID_TO_BIN("8b0a6be7-935a-11ee-a3af-d0c5d3070aa6"));
