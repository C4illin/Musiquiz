FROM node:16

WORKDIR /usr/src/app/frontend
COPY frontend/package*.json ./
RUN npm install --legacy-peer-deps
COPY frontend/ ./
RUN npm run build
WORKDIR /usr/src/app/backend
ENV NODE_ENV=production
COPY backend/package*.json ./
RUN npm install
COPY backend/ ./

EXPOSE 8080
CMD [ "node", "index.js" ]
