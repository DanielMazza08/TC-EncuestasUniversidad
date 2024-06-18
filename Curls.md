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

##### Pregunta 1 y 2
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