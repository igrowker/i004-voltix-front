#!/bin/bash

#limpia primero el servicio anterior
docker-compose down -v

# hace un rebuild
docker-compose build

#Ejecuta los servicios
docker-compose up -d
