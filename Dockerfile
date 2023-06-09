FROM node:18

WORKDIR /usr/src/app/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ ./
RUN npm run build
WORKDIR /usr/src/app/backend
ENV NODE_ENV=production
COPY backend/package*.json ./
RUN npm install
COPY backend/ ./

CMD [ "node", "index.js" ]
