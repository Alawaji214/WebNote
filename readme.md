

start db:
```shell
cd backend
chmod +x start_mongo.sh
./start_mongo.sh
```

run backend:
```shell
cd backend
npm install
npm start
```


run frontend:
```shell
cd frontend
npm install
npm run start-client
```

run all in one:
```shell
cd frontend
npm install
npm start
```


build image:
```shell
docker build -t note-app .
docker run -e MONGO_URI=mongodb://admin:1234@host.docker.internal:27017 \
  -p 4001:4000 -d note-app
```