# 



## API Supervielle
### Desafío técnico desarrollado en NODEJS a modo de práctica, documentación pendiente.
#### Proyecto funcionando en heroku: https://api-supervielle.herokuapp.com/

Para iniciar el proyecto, una vez clonado el repositorio:

- Es necesario tener instalado *NodeJS*
- Ejecutar el comando *npm install* para instalar las dependencias necesarias.
- Rellenar los campos con los datos de la DB en el archivo .env (archivo SQL para generar las tablas disponible en el repositorio)
- Ejecutar cualquiera de los siguientes comandos: *npm start* , *node ./src/bin/www* o bien *nodemon ./src/bin/www*
    
    - Endpoints:
    - **GET** **/personas**
    -     lista las personas registradas
    - **POST** **/personas/crear** 
    -     Crea una nueva entrada
    - **PUT** **/personas/editar/:id** 
    -     Permite editar los datos de una persona especifica
    - **DELETE** **/personas/borrar/:id** 
    -     Borra los datos de una persona especifica
    - **GET** **/estadisticas**
    -     Devuelve estadisticas generales
    - **POST** **/personas/:id1/:relacion/:id2** 
    -     Genera una relacion entre dos personas mediante su id, ejemplo: /personas/1/herman@/2
    -     relaciones posibles: ti@, prim@ o herman@. 
    - **GET** **/relaciones/:id1/:id2** 
    -     Devuelve el tipo de relación entre dos personas 
