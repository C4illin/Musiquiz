# Stage 1 - build
FROM node:16

WORKDIR /usr/src/app/frontend
COPY frontend/package*.json .
RUN npm install
COPY frontend/ .
RUN npm run build
WORKDIR /usr/src/app/
COPY package*.json .
RUN npm install
COPY . .

EXPOSE 8080
CMD [ "node", "index.js" ]
