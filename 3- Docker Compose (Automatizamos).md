# Instructivo para Configurar y Ejecutar el Proyecto `hogarTafi` con Docker Compose

Este instructivo te guiará paso a paso para configurar y ejecutar el proyecto `hogarTafi` utilizando Docker. Aprenderás a configurar el archivo `Dockerfile` y `docker-compose.yml`, así como a ejecutar los contenedores de manera sencilla.

## 1) ¿Qué es el `Dockerfile`?

El `Dockerfile` es un archivo que contiene una serie de instrucciones que Docker utilizará para construir una imagen. Una imagen es un paquete ligero y autónomo que incluye todo lo necesario para ejecutar una aplicación, incluyendo el código, las dependencias, el entorno de runtime, etc.

### Ejemplo de `Dockerfile` para `hogarTafi`

```Dockerfile
# Establecer la imagen base
FROM maven:3.8.8-eclipse-temurin-17

# Directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar el contenido del proyecto al contenedor
COPY . /app

# Comando para compilar el proyecto
RUN mvn clean package

# Comando por defecto para correr el contenedor
CMD ["java", "-jar", "target/hogarTafi-0.0.1-SNAPSHOT.jar"]
```

### Explicación del `Dockerfile`:

1. **`FROM maven:3.8.8-eclipse-temurin-17`**:
   - Esta línea establece la imagen base que se usará para construir el contenedor. En este caso, estamos utilizando una imagen que incluye Maven 3.8.8 y JDK 17, que son necesarios para compilar y ejecutar una aplicación Java.

2. **`WORKDIR /app`**:
   - Esta línea establece el directorio de trabajo dentro del contenedor. Es decir, todos los comandos posteriores en el Dockerfile se ejecutarán dentro del directorio `/app`.

3. **`COPY . /app`**:
   - Esta línea copia todo el contenido de tu proyecto (el directorio actual) en el directorio de trabajo `/app` dentro del contenedor. Esto incluye tu código fuente y los archivos de configuración.

4. **`RUN mvn clean package`**:
   - Esta línea ejecuta el comando de Maven para compilar el proyecto Java. `mvn clean package` compila tu código y empaqueta la aplicación en un archivo JAR que se guardará en el directorio `target/` dentro del contenedor.

5. **`CMD ["java", "-jar", "target/hogarTafi-0.0.1-SNAPSHOT.jar"]`**:
   - Esta línea especifica el comando que se ejecutará cuando se inicie el contenedor. En este caso, ejecutará el archivo JAR que fue creado durante la compilación.

## 2) ¿Qué es el `docker-compose.yml`?

`docker-compose.yml` es un archivo de configuración que define los servicios que componen tu aplicación. Estos servicios pueden ser contenedores de Docker que trabajan juntos para ejecutar tu aplicación. Con Docker Compose, puedes definir y ejecutar múltiples contenedores con un solo comando.

### Ejemplo de `docker-compose.yml` para `hogarTafi`

```yaml
version: '3.8'

services:
  mongodb:
    image: mongo:latest
    container_name: mi-mongodb-contenedor
    environment:
      MONGO_INITDB_ROOT_USERNAME: admin
      MONGO_INITDB_ROOT_PASSWORD: adminpassword
    ports:
      - "27017:27017"
  
  webserver:
    build: .
    container_name: entorno-maven-java-HogarTafi
    ports:
      - "8080:8080"
    depends_on:
      - mongodb
    volumes:
      - .:/app
    environment:
      SPRING_DATA_MONGODB_URI: mongodb://admin:adminpassword@mongodb:27017/hogarTafi
    command: ["java", "-jar", "target/hogarTafi-0.0.1-SNAPSHOT.jar"]
```

### Explicación del `docker-compose.yml`:

1. **`version: '3.8'`**:
   - Esta línea define la versión de Docker Compose que estás utilizando.

2. **Servicios (`services`)**:
   - Esta sección define los diferentes contenedores que se ejecutarán como parte de tu aplicación.

3. **`mongodb`**:
   - **`image: mongo:latest`**: Indica que este servicio utilizará la imagen oficial de MongoDB más reciente.
   - **`container_name: mi-mongodb-contenedor`**: Asigna un nombre al contenedor de MongoDB.
   - **`environment`**: Aquí se definen variables de entorno que configuran MongoDB, como el nombre de usuario y la contraseña del administrador.
   - **`ports: - "27017:27017"`**: Mapea el puerto 27017 del contenedor al puerto 27017 de la máquina anfitriona para que puedas acceder a MongoDB desde fuera del contenedor.

4. **`webserver`**:
   - **`build: .`**: Indica que este servicio se construirá a partir del `Dockerfile` en el directorio actual.
   - **`container_name: entorno-maven-java-HogarTafi`**: Asigna un nombre al contenedor que ejecutará la aplicación Java.
   - **`ports: - "8080:8080"`**: Mapea el puerto 8080 del contenedor al puerto 8080 de la máquina anfitriona para que puedas acceder a la aplicación web.
   - **`depends_on: - mongodb`**: Indica que este servicio depende del servicio de MongoDB, asegurando que MongoDB se inicie antes que la aplicación Java.
   - **`volumes: - .:/app`**: Monta el directorio actual en `/app` dentro del contenedor, permitiendo que los archivos de tu proyecto estén disponibles dentro del contenedor.
   - **`environment`**: Define variables de entorno, en este caso la URI de conexión a MongoDB que utilizará la aplicación Java.
   - **`command: ["java", "-jar", "target/hogarTafi-0.0.1-SNAPSHOT.jar"]`**: Este es el comando que se ejecutará para iniciar la aplicación Java.

## 3) Cómo Ejecutar el `Dockerfile` con Docker Compose

Ahora que tienes configurados el `Dockerfile` y el `docker-compose.yml`, puedes construir y ejecutar los contenedores utilizando Docker Compose.

### Pasos:

1. **Asegúrate de que Docker esté corriendo**:
   - En Windows y macOS, verifica que Docker Desktop esté abierto y ejecutándose. En Linux, asegúrate de que el servicio Docker esté activo.

2. **Construir y levantar los contenedores**:
   - Desde la terminal, navega al directorio donde tienes guardados el `Dockerfile` y el `docker-compose.yml`.
   - Ejecuta el siguiente comando:

   ```bash
   docker-compose up --build
   ```

   - Este comando construirá las imágenes necesarias utilizando el `Dockerfile` y luego levantará los contenedores definidos en `docker-compose.yml`.

3. **Acceder a la aplicación**:
   - Una vez que los contenedores estén corriendo, puedes acceder a la aplicación web abriendo un navegador y visitando `http://localhost:8080`.
   - MongoDB estará disponible en `localhost:27017`.

### 4) Detener los Contenedores

Para detener todos los contenedores que se están ejecutando, puedes usar:

```bash
docker-compose down
```

Este comando apagará todos los contenedores definidos en tu `docker-compose.yml`.
