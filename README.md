# AGC-Manager

#### VERSIONES

  - Versión de NodeJS -> 20.9.0 : https://nodejs.org/en  
  - Versión de NPM -> 10.2.4 : https://www.npmjs.com/  

#### BASE DE DATOS  

  - Lenguaje MySQL  
  - MySQL Workbench 8.0 CE : https://www.mysql.com/products/workbench/  
  - Laragon : https://laragon.org/index.html

#### INSTALAR LAS DEPENDENCIAS NECESARIAS Y EXTENSIONES
1. Acceder a VisualStudioCode en el repositorio donde se encuentre la totalidad del código en "AGC-Manager/"
2. Abrir la terminal y ejecutar el comando: "npm install", automáticamente, todas las dependencias habrán sido instaladas correctamente.
3. Aquí se muestran algunas de las extensiones que han sido utilizadas durante el desarrollo de la Aplicación Web:
  - ESLint, Auto Rename Tag, Indenticator, JavaScript (ES6) code snippets, Live Preview, node-snippets, REST Client.

#### PUESTA EN MARCHA  --> DESARROLLO
El desarrollo de la página se ha llevado a cabo con las versiones especificadas anteriormente, para el correcto funcionamiento, se deben tener instaladas las mismas versiones, ya que otras versiones pueden generar fallos o incompatibilidades.  

1. Abrir Laragon y pulsar el botón de Iniciar.
2. Acceder a MySQL Workbench y pulsar, en MySQL Connections, "Local instance MySQL80".
3. Abrir todos los scripts de la Base de datos que se pueden encontrar en el directorio "AGC-Manager/src/DataBase".  
4. Ejecutar los scripts tables.sql, triggers.sql y populate.sql. Si se quiere comprobar, ejecutar las consultas del selects.sql.
5. Acceder a VisualStudioCode.
6. Ejecutar en la terminal el comando "node --watch src/index.js".
7. Pinchar en la ruta que aparece una vez se ejecuta el comando, es una ruta de localhost.
8. Una vez se accede a la ruta de localhost en el navegador, preferiblemente en Google Chrome ya que se ha programado en este navegador, se puede acceder a la aplicación web con los siguientes datos.

#### CUENTAS DE PRUEBA  

Para acceder a la aplicación web habrá que utilizar un email registrado con contraseña. Hay tres tipos de usuarios diferentes:
  - Usuario Administrador, puede acceder a todas las funcionalidades del sistema. A diferencia del usuario Normal, este puede gestionar todos los usuarios que hay en el sistema y poder visualizarlos. Además, puede crear un usuario Autorizado, si así se le pide.
  - Usuario Normal, puede acceder a todas las funcionalidades del sistema, excepto las que son únicamente para el usuario Administrador.
  - Usuario Autorizado, puede acceder con un email y una contraseña provisional proporcionada por el administrador, una vez que inicia sesión, automaticamente se le pide que cambie dicha contraseña por una más segura. Una vez que se cambia la contraseña, el usuario autorizado pasa a ser un usuario Normal.

Aquí se muestran los diferentes tipos de accesos de prueba en el sistema con sus correspondientes emails y contraseñas:

Acceder como usuario Administrador:  
  - Email: a@a.com
  - Contraseña: a

Acceder como usuario Normal:  
  - Email: b@b.com
  - Contraseña: b

Acceder como usuario Autorizado:  
  - Email: c@c.com
  - Contraseña: c


