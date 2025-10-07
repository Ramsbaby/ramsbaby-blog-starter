# syntax=docker/dockerfile:1

# Build stage
FROM gradle:8.10.2-jdk21-alpine AS build
WORKDIR /src
COPY . .
RUN gradle -q wrapper && \
    chmod +x ./gradlew && \
    ./gradlew -q clean bootJar

# Runtime stage
FROM eclipse-temurin:21-jre
WORKDIR /app
COPY --from=build /src/build/libs/*-SNAPSHOT.jar /app/app.jar
RUN mkdir -p /app/data
EXPOSE 8080
ENTRYPOINT ["java","-jar","/app/app.jar"]

