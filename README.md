# Fshop API

### Tech Stack

Frontend (UI)

- React

API

- Sprint Boot Framework
- Mongo DB
- Mongo Express
- Docker

### How to start the UI

1. Start the frontend server
```
cd ui/
npm start
```

### How to start the API

1. Start the database
```
cd api/
sudo docker-composer up 
```

2. Start the server
```
cd api/
mvn spring-boot:run
```

URL to access Mongo Express

http://localhost:8081

URL to access the API

http://localhost:8080/api/v1

URL to access the UI

http://localhost:3000
