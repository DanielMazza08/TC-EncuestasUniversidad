# Sistema de Encuestas

## Introducción

El propósito de este documento es proporcionar una visión general del sistema de encuestas diseñado para la Universidad, que permitirá la creación, gestión y realización de encuestas El sistema está diseñado para ser utilizado por personas que podran registrase en la plataforma para responder las encuestas

## Objetivos

El objetivo principal de este proyecto es desarrollar un software que permita:

- Crear y gestionar encuestas desde una plataforma centralizada. Tambien sera posible crearla manualmente desde la base de datos.
- Recopilar datos relevantes de los encuestados y generar reportes  para su posterior analisis.

## Arquitectura del Sistema

El sistema estará compuesto por los siguientes componentes principales:

- **Frontend**: Interfaz de usuario diseñada utilizando tecnologías web como HTML, CSS y JavaScript.
- **Backend**: Lógica de negocio y gestión de datos implementada utilizando JavaScript como lenguaje de programación.
- **Base de Datos**: Almacenamiento de datos relacionados con encuestas, usuarios y respuestas utilizando un sistema de gestión de bases de datos como MySQL y SQLite
- **Seguridad**: Implementación de validaciones mieante uso de middlewares y schemas.

## Modelo de datos

![Diagrama ER](images/diagrama%20ER.png)

--------

## Instrucciones para Probar el Sistema

### Configuración Inicial

1. Crear la base de datos y las tablas.

   La siguiente línea crea el archivo `datos.sqlite` con las tablas vacías en la carpeta `src/db/data/`. Si el archivo ya existe, no es necesario ejecutar esta línea, ya que probablemente ya contiene datos. Si se desea comenzar de nuevo, podes eliminar el archivo y generarlo nuevamente utilizando la siguiente línea:

   ```bash
   npx sequelize-cli db:migrate --migrations-path src/migrations
   
2. Conectar a la base de datos SQLite usando DBeaver y buscar el archivo datos.sqlite en la ruta especificada.

3. Iniciar el servidor: **npm run dev**
   
--------

### Uso de la api en Postman

1. Crear una o más personas.
2. Crear una encuesta.
3. Crear preguntas. Podemos crear de a varias usando bulkCreate
4. Crear opciones. Podemos crear de a varias usando bulkCreate. Las opciones se asocian a las preguntas, con lo cual estas ultimas ya deben exister previamente.
5. Responder una encuestas. Las mismas se gurdan en **survey_response_data**
6. Generar reportes utilizando las funciones disponibles en respuestasController.

* En el archivo **TP-UNPAZ.postman_collection** se encuestra una coleccion con todos los endpoints endpoints para probar. Tambien dejo por saparado en la raiz el archivo **Curls.md** por si acaso.

--------

### Frontend del sistema

Para este frontend basico que armamos se van a poder dar de alta personas nuevas y luego listar todas la que existen en la tabla que se encuestra a la derecha. Se estan realizando todas la validaciones al dar el alta.

1. Poner a correr el servidor con **npm run dev** 
2. Pegar esta ruta en la barra de direciones del navegador: **http://localhost:3000**
*En caso de tener problemas con el front correr este comando antes del npm run dev: **npm install -g http-server***
3. Dar de alta alguna persona
4. Tocar en mostrar usuarios para ver el que dimos de alta y los que ya existieran de antes.
![Formulario+Tabla - Usuarios](/images/tabla%20usuarios.png)
