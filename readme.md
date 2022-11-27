# Musikwiss

Fixed QR and hosting, all credit to original authors.

https://musikwiss.emrik.org/

DM me your email if you want it to work for your spotify account or host it yourself

## Installation
```yml
# docker-compose.yml

services:
  musikwiss:
    image: ghcr.io/c4illin/musiquiz:main
    container_name: musikwiss
    ports:
      - 8080:8080
    environment:
      - PORT=8080
      - CLIENT_ID=bdf8cb568bf916b20aff88e920c0eaf3
      - CLIENT_SECRET=856f525bf00df6c7a7038e85b84d17a4
```

or locally build:

```yml
services:
  musikwiss:
    build: .
    ports:
      - 8080:8080
    environment:
      - PORT=8080
      - CLIENT_ID=bdf8cb568bf916b20aff88e920c0eaf3
      - CLIENT_SECRET=856f525bf00df6c7a7038e85b84d17a4
```
