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