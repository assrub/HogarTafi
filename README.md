# Instructivo para Configurar y Correr el Proyecto `hogarTafi`

## 1) Descargar e Instalar Docker

Antes de empezar, es necesario que tengas Docker instalado en tu sistema. Si no lo tienes, sigue estos pasos:

1. **Descargar Docker**:
   - Visita la [página oficial de Docker](https://www.docker.com/products/docker-desktop) y descarga Docker Desktop para tu sistema operativo (Windows, macOS o Linux).
   - Sigue las instrucciones de instalación proporcionadas en la página.

2. **Verificar la Instalación**:
   - Abre la terminal (PowerShell en Windows, Terminal en macOS/Linux) y ejecuta el siguiente comando para verificar que Docker está instalado correctamente:

   ```bash
   docker --version
   ```

   Deberías ver la versión de Docker instalada.

> **Nota**: En Windows, asegúrate de que Docker Desktop esté corriendo antes de ejecutar cualquier comando. En macOS y Linux, Docker debería estar listo para usar desde la terminal.

## 2) Descargar y Correr MongoDB

Con Docker instalado y corriendo, ahora puedes descargar y correr un contenedor de MongoDB:

```bash
docker run -d --name mi-mongodb-contenedor -p 27017:27017 \
  -e MONGO_INITDB_ROOT_USERNAME=admin \
  -e MONGO_INITDB_ROOT_PASSWORD=adminpassword \
  mongo:latest
```

> **Consideraciones**:
> - Este comando descargará la imagen de MongoDB (si no está ya descargada) y levantará un contenedor llamado `mi-mongodb-contenedor`.
> - La opción `-p 27017:27017` expone el puerto 27017 del contenedor a tu máquina local.
> - Las variables de entorno `MONGO_INITDB_ROOT_USERNAME` y `MONGO_INITDB_ROOT_PASSWORD` configuran el usuario y la contraseña del administrador.

Aquí tienes una versión más detallada del punto 3, explicando para qué sirve cada parte del comando:

---

## 3) Descargar y Correr Maven, Enlazado con MongoDB

Para correr el contenedor de Maven y enlazarlo con el contenedor de MongoDB, usa el siguiente comando:

```bash
docker run -it --dns 8.8.8.8 -p 8080:8080 --name entorno-maven-java-HogarTafi --link mi-mongodb-contenedor:mongo -v /c/Users/19-NBK-0482/OneDrive/Desktop/hogarTafi/hogarTafi:/app -w /app maven:3.8.8-eclipse-temurin-17 bash
```

### Desglose del Comando

1. **`docker run`**: Este es el comando básico para crear y correr un contenedor basado en una imagen de Docker.

2. **`-it`**: 
   - `-i` (interactivo): Mantiene la entrada estándar (stdin) del contenedor abierta, lo que es útil para interactuar con el contenedor.
   - `-t` (pseudo-TTY): Asigna un terminal virtual al contenedor, permitiéndote interactuar con él como si fuera una terminal real.

3. **`--dns 8.8.8.8`**:
   - Especifica el servidor DNS que el contenedor utilizará para resolver nombres de dominio. En este caso, se usa el servidor DNS público de Google (`8.8.8.8`). Esto es opcional y solo necesario si tienes problemas de DNS en el contenedor.

4. **`-p 8080:8080`**:
   - Mapea el puerto 8080 del contenedor al puerto 8080 de tu máquina local. Esto permite que accedas a cualquier servicio corriendo en el puerto 8080 dentro del contenedor desde tu navegador o desde aplicaciones externas.

5. **`--name entorno-maven-java-HogarTafi`**:
   - Asigna un nombre al contenedor. Esto facilita su identificación y manejo en comandos futuros (en lugar de usar el ID del contenedor).

6. **`--link mi-mongodb-contenedor:mongo`**:
   - Enlaza el contenedor que estás creando con el contenedor de MongoDB (`mi-mongodb-contenedor`).
   - `mi-mongodb-contenedor` es el nombre del contenedor de MongoDB que se enlaza.
   - `mongo` es el alias que se utilizará dentro del nuevo contenedor para referirse al contenedor de MongoDB. Esto permite que dentro del contenedor de Maven puedas conectarte a MongoDB simplemente usando el nombre `mongo`.

7. **`-v /c/Users/19-NBK-0482/OneDrive/Desktop/hogarTafi/hogarTafi:/app`**:
   - Monta un volumen desde tu sistema local al contenedor. 
   - `/c/Users/19-NBK-0482/OneDrive/Desktop/hogarTafi/hogarTafi` es la ruta en tu máquina local.
   - `/app` es la ruta dentro del contenedor donde se montará el volumen.
   - Esto permite que los archivos de tu proyecto (ubicados en tu máquina) sean accesibles y modificables dentro del contenedor. Cualquier cambio hecho en estos archivos dentro del contenedor se reflejará directamente en tu sistema de archivos local.

8. **`-w /app`**:
   - Establece el directorio de trabajo dentro del contenedor. 
   - `-w /app` indica que `/app` será el directorio en el que se ejecutarán los comandos dentro del contenedor. Dado que has montado tu proyecto en `/app`, cualquier comando que corras desde la terminal del contenedor afectará directamente a tu proyecto.

9. **`maven:3.8.8-eclipse-temurin-17`**:
   - Especifica la imagen de Docker que se usará para crear el contenedor.
   - `maven:3.8.8-eclipse-temurin-17` es una imagen que incluye Maven versión 3.8.8 y el JDK 17 basado en Eclipse Temurin, lo cual es ideal para proyectos Java modernos.

10. **`bash`**:
    - Especifica el comando que se ejecutará al iniciar el contenedor. 
    - En este caso, se ejecuta `bash`, que es el shell de Linux. Esto te permite interactuar con el contenedor desde una terminal bash.

### Resumen del Proceso

- Este comando crea un entorno de desarrollo dentro de un contenedor Docker que tiene Maven y Java preinstalados.
- El contenedor está preparado para interactuar con MongoDB, permitiendo la compilación y ejecución del proyecto Java sin necesidad de instalar Maven o Java directamente en tu máquina.
- Además, cualquier cambio que hagas en tu proyecto desde el contenedor se reflejará inmediatamente en tu sistema local gracias al volumen montado.


## 4) Modificar `application.properties`

Modifica el archivo `application.properties` para que coincida con la configuración de MongoDB:

```properties
spring.application.name=hogarTafi
spring.data.mongodb.uri=mongodb://admin:adminpassword@mongo:27017/hogarTafi
spring.data.mongodb.database=hogarTafi
```

> **Consideraciones**:
> - Asegúrate de que la URI de MongoDB esté configurada correctamente para conectarse al contenedor con el usuario y contraseña que especificaste.

## 5) Compilar el Proyecto con Maven

Compila el proyecto con el siguiente comando:

```bash
mvn clean package
```

### Posible Error

> ⚠️ **Error**: "[INFO] Copying 1 resource from src/main/resources to target/clases"

### Soluciones

> ✅ **Solución**:
> - Ejecuta el siguiente comando para otorgar permisos de escritura:
>   ```bash
>   chmod -R u+w /app/target
>   ```
> - Elimina la carpeta `target` manualmente:
>   ```bash
>   rm -rf /app/target
>   ```
> - Vuelve a ejecutar el comando de compilación:
>   ```bash
>   mvn clean package
>   ```

## 6) Levantar el Servidor

Después de compilar, levanta el servidor con el siguiente comando:

```bash
java -jar target/hogarTafi-0.0.1-SNAPSHOT.jar
```

> **Consideraciones**:
> - Asegúrate de que estás en el directorio correcto (`/app`) cuando ejecutes este comando.
> - Verifica que el puerto 8080 no esté ocupado en tu máquina, ya que el servidor lo utilizará.

---
