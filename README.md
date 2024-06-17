# Sistema de Encuestas con SQLite

## Modelo de datos

![Diagrama ER](images/diagrama%20ER.png)


--------

## Instrucciones para Probar el Sistema

### Configuración Inicial

1. Crear la base de datos y las tablas.

   La siguiente línea crea el archivo `datos.sqlite` con las tablas vacías en la carpeta `src/db/data/`. Si el archivo ya existe, no es necesario ejecutar esta línea, ya que probablemente ya contiene datos. Si deseas comenzar de nuevo, puedes eliminar el archivo y generarlo nuevamente utilizando la siguiente línea:

   ```bash
   npx sequelize-cli db:migrate --migrations-path src/migrations
   
2. Conectar a la base de datos SQLite usando DBeaver y buscar el archivo datos.sqlite en la ruta especificada.

3. Iniciar el servidor: npm run dev
--------
### Uso en Postman

1. Crear una o más personas.
2. Crear una encuesta.
3. Crear una pregunta y sus opciones. Podemos crear varias preguntas con varias opciones en cada una, no hay limite.
4. Registrar respuestas de una persona a varias preguntas a la vez. Para hacer esto deberian haber por lo menos dos preguntas creadas
5. Generar reportes utilizando las funciones del respuestasController.

--------

### Endpoints

#### Crear personas
```bash
curl --location 'http://localhost:3000/personas/crearpersona' \
--header 'Content-Type: application/json' \
--data '{
    "dni": "38827034",
    "firstname": "Cristian",
    "lastname": "Mazza",
    "gender": "M",
    "email": "cristian.mazza@mail.com",
    "password": "12345",
    "active": "true"
}'
```
#### Otros Endpoints:

* Mostrar persona por ID: http://localhost:3000/personas/mostrarpersonasporid/:id
* Mostrar todas las personas: http://localhost:3000/personas/mostrarpersonas
* Eliminar persona por ID: http://localhost:3000/personas/eliminarpersona/:id
* Editar persona por ID: http://localhost:3000/personas/editarpersona/:id

--------
#### Crear encuestas
```bash
curl --location 'http://localhost:3000/encuestas/crearencuestas' \
--header 'Content-Type: application/json' \
--data '{
    "survey_name": "Encuesta de conformidad",
    "active": "true"
}'
```
#### Otros Endpoints:
* Mostrar encuestas: http://localhost:3000/encuestas/mostrarencuestas
* Editar encuestas: http://localhost:3000/encuestas/editarencuestas/:id
* Eliminar encuestas por ID: http://localhost:3000/encuestas/eliminarencuestas/:id
* Mostrar encuestas con preguntas: http://localhost:3000/encuestas/mostrarencuestasconpreguntas
* Mostrar encuestas con preguntas y opciones: http://localhost:3000/encuestas/mostrarencuestasconpreguntasyopciones

--------

#### Crear Preguntas
##### Pregunta 1
```bash
curl --location 'http://localhost:3000/preguntas/crearpreguntas' \
--header 'Content-Type: application/json' \
--data '{
    "survey_id": "1",
    "question_code": "P1",
    "question_title": "¿Estás conforme con la carrera que elegiste?"
}'
```
##### Pregunta 2
```bash
curl --location 'http://localhost:3000/preguntas/crearpreguntas' \
--header 'Content-Type: application/json' \
--data-raw '[
    {
        "survey_id": "1",
        "question_code": "P1",
        "question_title": "¿Estás conforme con la carrera que elegiste?"
    },
    {
        "survey_id": "1",
        "question_code": "P2",
        "question_title": "¿Por qué elegiste esta carrera?"
    }
]'
```
#### Otros Endpoints:

* Mostrar preguntas: http://localhost:3000/preguntas/mostrarpreguntas
* Mostrar preguntas con opciones: http://localhost:3000/preguntas/mostrarpreguntasconopciones
* Editar preguntas por ID: http://localhost:3000/preguntas/editarpreguntas/:id
* Eliminar preguntas por ID: http://localhost:3000/preguntas/eliminarpreguntas/:id

--------
#### Crear Opciones
##### Opciones para Pregunta 1
```bash
curl --location --request POST 'http://localhost:3000/opciones/crearopciones' \
--header 'Content-Type: application/json' \
--data-raw '[
    {
        "label_option": "Muy conforme",
        "question_id": "1"
    },
    {
        "label_option": "Poco conforme",
        "question_id": "1"
    }
]'
```
##### Opciones para Pregunta 2
```bash
curl --location --request POST 'http://localhost:3000/opciones/crearopciones' \
--header 'Content-Type: application/json' \
--data-raw '[
    {
        "label_option": "Me la recomendaron",
        "question_id": "2"
    },
    {
        "label_option": "Era la única que me interesaba",
        "question_id": "2"
    }
]'
```
#### Otros Endpoints:

* Mostrar opciones: http://localhost:3000/opciones/mostraropciones
* Editar opciones por ID: http://localhost:3000/opciones/editaropciones/:id
* Eliminar opciones por ID: http://localhost:3000/opciones/eliminaropciones/:id

--------
#### Responder Preguntas (Varias a la Vez)
```bash
curl --location 'http://localhost:3000/respuestas/realizarencuesta' \
--header 'Content-Type: application/json' \
--data '[
    {
        "person_id": "1",
        "survey_id": "1",
        "question_id": "1",
        "option_id": "2"
    },
    {
        "person_id": "1",
        "survey_id": "1",
        "question_id": "2",
        "option_id": "3"
    }
]'
```
--------
### Generar Reportes
#### Mostrar Respuestas de una Persona por su ID
```bash
http://localhost:3000/respuestas/mostrarresultados/1
```
#### Mostrar Personas que Respondieron una Encuesta Específica
```bash
http://localhost:3000/respuestas/mostrarPersonasquerespondieronencuesta/1
```
#### Mostrar Cantidad de Veces que se Eligió una Opción de una Encuesta y Pregunta Específica
```bash
http://localhost:3000/respuestas/vecesqueeligioopcion/1/1/2
```
--------
### Para el frontend

Pegar esta ruta en la barra de direciones del navegador: http://localhost:3000

En caso de tener problemas con el front correr este comando antes del npm run dev: **npm install -g http-server**

Para este frontend basico que armamos se van a poder dar de alta personas nuevas y luego mostrar todas la que existen en una tabla.

![Formulario+Tabla - Usuarios](/images/Formulario+Tabla%20-%20Usuarios.png)
