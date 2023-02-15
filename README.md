# employees-basic-service

build docker
docker build . -t acrwebdev/employees-basic-service:0.0.2

docker push
docker push acrwebdev/employees-basic-service:0.0.2

docker pull acrwebdev/employees-basic-service:0.0.2

docker pull acrwebdev/employees-basic-service:latest

run docker
docker run -p 21000:21000 --env SERVER_IP=34.80.78.75 --env SERVER_PORT=21000 --env SWAGGER_IP=34.80.78.75 --env DB_URI="" --restart=always --name=employees-basic-service -d acrwebdev/employees-basic-service:0.0.2
