docker build -t coder .
docker run -d -p 8080:80 --rm --name coder coder:latest