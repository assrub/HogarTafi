# Establecer la imagen base
FROM maven:3.8.8-eclipse-temurin-17

# Directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar el contenido del proyecto al contenedor
COPY . /app

# Comando para compilar el proyecto
RUN mvn clean package -DskipTests

# Comando por defecto para correr el contenedor
CMD ["java", "-jar", "target/hogarTafi-0.0.1-SNAPSHOT.jar"]





#PARA CUANDO QUISIERAMOS INCLUIR EL FRONT CON VITE 

# Establecer la imagen base para el backend
#FROM maven:3.8.8-eclipse-temurin-17 AS build-backend

# Directorio de trabajo dentro del contenedor
#WORKDIR /app

# Copiar el contenido del proyecto al contenedor
#COPY . /app

# Comando para compilar el proyecto
#RUN mvn clean package -DskipTests

# Establecer la imagen base para el frontend
#FROM node:16 AS build-frontend

# Directorio de trabajo para el frontend
#WORKDIR /app

# Copiar solo los archivos necesarios para el frontend
#COPY frontend/package*.json ./  # Asegúrate de que la ruta sea correcta
#COPY frontend/ ./  # Asegúrate de que la ruta sea correcta

# Instalar dependencias de Vite
#RUN npm install

# Construir la aplicación de Vite
#RUN npm run build

# Usar Nginx para servir la aplicación
#FROM nginx:alpine

# Copiar los archivos construidos desde la etapa anterior
#COPY --from=build-frontend /app/dist /usr/share/nginx/html

# Copiar el JAR del backend desde la etapa de construcción del backend
#COPY --from=build-backend /app/target/hogarTafi-0.0.1-SNAPSHOT.jar /app/hogarTafi.jar

# Exponer el puerto 80 para Nginx
#EXPOSE 80

# Comando por defecto para correr el contenedor
#CMD ["nginx", "-g", "daemon off;"]
