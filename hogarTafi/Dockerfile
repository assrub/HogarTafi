# Etapa 1: Construir el backend
FROM maven:3.8.8-eclipse-temurin-17 AS build
WORKDIR /app  
COPY . /app
RUN mvn clean package -DskipTests

# Etapa 2: Ejecutar la aplicación
FROM openjdk:17-slim
WORKDIR /app
COPY --from=build /app/target/hogarTafi-0.0.1-SNAPSHOT.jar /app/hogarTafi.jar
EXPOSE 8080
CMD ["java", "-jar", "hogarTafi.jar"]
