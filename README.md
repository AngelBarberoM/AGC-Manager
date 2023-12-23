# AGC-Manager

### · Versiones

Versión de NodeJS -> 20.9.0 : https://nodejs.org/en  

Versión de NPM -> 6.14.6 : https://www.npmjs.com/  


### · BASE DE DATOS  

Lenguaje MySQL  

MySQL Workbench 8.0 CE : https://www.mysql.com/products/workbench/  

Laragon : https://laragon.org/index.html  

### · PUESTA EN MARCHA  --> DESARROLLO
El desarrollo de la página se ha llevado a cabo con las versiones especificadas anteriormente, para el correcto funcionamiento, se deben tener instaladas las mismas versiones, ya que otras versiones pueden generar fallos o incompatibilidades.  

1. Abrir Laragon y pulsar el botón de Iniciar.
2. Acceder a MySQL Workbench y pulsar, en MySQL Connections, "Local instance MySQL80".
3. Abrir todos los scripts de la Base de datos.  
4. Ejecutar los scripts tables.sql, triggers.sql y populate.sql. Si se quiere comprobar, ejecutar las consultas del selects.sql.
5. Acceder a VisualStudioCode.
6. Ejecutar en la terminal el comando "npm run dev" o "node --watch src/index.js". El comando "npm run dev" es un script que lanza "node --watch src/index.js", pero si no se tiene una versión de NPM correcta, puede fallar.
7. Pinchar en la ruta que aparece una vez se ejecuta el comando, es una ruta de localhost.

