FROM maven:3.8.8-eclipse-temurin-17

WORKDIR /app

COPY . ./

RUN mvn dependency:go-offline

COPY src ./src
 
EXPOSE 8080

CMD ["mvn", "spring-boot:run"]
