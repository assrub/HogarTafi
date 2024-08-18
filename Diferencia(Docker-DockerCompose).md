# 1- Diferencias entre Docker y Docker Compose

## Docker

- **Docker** se utiliza principalmente para manejar contenedores individuales. Para crear, configurar y correr un contenedor, necesitas ejecutar una serie de comandos manuales en la terminal.

- Cuando trabajas con múltiples contenedores (por ejemplo, una aplicación que necesita una base de datos, un servidor web y un servicio de caché), debes ejecutar un comando separado para cada contenedor, asegurándote de que todos estén configurados correctamente y en el orden correcto.

### Ejemplo con Docker

Supongamos que tienes una aplicación que requiere una base de datos MongoDB y un servidor web. Con Docker, tendrías que ejecutar estos comandos por separado:

```bash
# Correr MongoDB
docker run -d --name mi-mongodb-contenedor -p 27017:27017 mongo:latest

# Correr el servidor web
docker run -d --name mi-webserver -p 8080:8080 --link mi-mongodb-contenedor:mongo my-webserver-image
```

## Docker Compose

- **Docker Compose** facilita la gestión de aplicaciones que requieren múltiples contenedores. En lugar de ejecutar varios comandos manualmente, Docker Compose te permite definir toda la configuración en un solo archivo `docker-compose.yml`.

- El archivo `docker-compose.yml` contiene toda la información sobre las imágenes, los volúmenes, las redes y las configuraciones que cada contenedor necesita.

- Una vez definido el `docker-compose.yml`, puedes iniciar todos los contenedores necesarios con un solo comando:

```bash
docker-compose up
```

### Ejemplo con Docker Compose

El mismo ejemplo anterior se simplifica mucho usando Docker Compose. El archivo `docker-compose.yml` podría verse así:

```yaml
version: '3'
services:
  mongodb:
    image: mongo:latest
    ports:
      - "27017:27017"
  webserver:
    image: my-webserver-image
    ports:
      - "8080:8080"
    depends_on:
      - mongodb
```

Y luego, para iniciar ambos contenedores:

```bash
docker-compose up
```

## Resumen de Diferencias

- **Docker**: Se enfoca en la gestión de contenedores individuales a través de comandos manuales en la terminal.
- **Docker Compose**: Simplifica la gestión de múltiples contenedores y sus interacciones mediante un archivo de configuración (`docker-compose.yml`) y permite iniciar todo con un solo comando.

En resumen, Docker Compose es una herramienta adicional que se construye sobre Docker para facilitar el trabajo con aplicaciones compuestas por múltiples contenedores, haciéndolo más eficiente y manejable.
```

Este Markdown explica las diferencias entre Docker y Docker Compose, incluyendo ejemplos y un resumen de las diferencias clave.
