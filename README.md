# employees-basic-service

build docker
docker build . -t acrwebdev/employees-basic-service

docker push
docker push acrwebdev/employees-basic-service

docker pull acrwebdev/employees-basic-service:latest

run docker
docker run -p 21000:21000 --env SERVER_IP=35.234.42.100 --env SERVER_PORT=21000 --env DB_PORT=27017 --env DB_IP=10.140.0.2 --env SWAGGER_IP=35.234.42.100 --restart=always --name=employees-basic-service -d acrwebdev/employees-basic-service
