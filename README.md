# company-basic-service

build docker
docker build . -t acrwebdev/company-basic-service

docker push
docker push acrwebdev/company-basic-service

docker pull acrwebdev/company-basic-service:latest

run docker
docker run -p 20000:20000 --env SERVER_IP=35.234.42.100 --env SERVER_PORT=20000 --env DB_PORT=27017 --env DB_IP=10.140.0.2 --env SWAGGER_IP=35.234.42.100 --restart=always --name=company-basic-service -d acrwebdev/company-basic-service
