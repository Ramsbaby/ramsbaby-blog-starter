# syntax=docker/dockerfile:1

# Build stage (Debian base to avoid SSL/DNS issues)
FROM gradle:8.10.2-jdk21 AS build
WORKDIR /src
RUN apt-get update && apt-get install -y --no-install-recommends ca-certificates && rm -rf /var/lib/apt/lists/*
COPY . .
RUN gradle --no-daemon -q clean bootJar

# Runtime stage
FROM eclipse-temurin:21-jre
WORKDIR /app
COPY --from=build /src/build/libs/*-SNAPSHOT.jar /app/app.jar
RUN mkdir -p /app/data
EXPOSE 8080
ENTRYPOINT ["java","-jar","/app/app.jar"]

