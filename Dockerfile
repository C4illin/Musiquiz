FROM node:18

ENV NODE_ENV=production
WORKDIR /usr/src/app/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ ./
RUN npm run build
WORKDIR /usr/src/app/backend
COPY backend/package*.json ./
RUN npm install
COPY backend/ ./

CMD [ "node", "index.js" ]
