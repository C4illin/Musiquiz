FROM node:16

WORKDIR /app/frontend
COPY frontend/package*.json .
ENV NODE_ENV=production
RUN npm install
COPY frontend/ .
RUN npm run build
WORKDIR /app
COPY package*.json .
RUN npm install
COPY . .

EXPOSE 8080
CMD [ "node", "index.js" ]