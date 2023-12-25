#!/bin/bash

# Pull the latest MongoDB image
docker pull mongo

# Run the MongoDB container
docker run --name note-mongo \
           -e MONGO_INITDB_ROOT_USERNAME=admin \
           -e MONGO_INITDB_ROOT_PASSWORD=1234 \
           -p 27017:27017 \
           -d mongo

export MONGO_URI=mongodb://admin:1234@localhost:27017/note-app?authSource=admin
export JWT_SECRET=secret