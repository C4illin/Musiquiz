# Musikwiss

Fixed QR and hosting, all credit to original authors.

https://musikwiss.emrik.org/

## Installation
```yml
services:
  musikwiss:
    image: ghcr.io/c4illin/musiquiz:main
    container_name: musikwiss
    environment:
      - PORT=8080
      - CLIENT_ID=bdf8cb568bf916b20aff88e920c0eaf3
      - CLIENT_SECRET=856f525bf00df6c7a7038e85b84d17a4
```