docker build -t bertgec_server .
docker run --name server -p 5001:5000 --volume $(pwd):/app/ -d bertgec_server