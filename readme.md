

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


build image for GCP:
```shell
docker build --platform linux/amd64 -t note-app:v12 .
gcloud auth configure-docker europe-west3-docker.pkg.dev
docker tag note-app:v12 europe-west3-docker.pkg.dev/note-409215/note-repo/note-app:v12
docker push europe-west3-docker.pkg.dev/note-409215/note-repo/note-app:v12
```

https://cloud.mongodb.com/v2/6589caee77a8e02a026e8b78#/clusters