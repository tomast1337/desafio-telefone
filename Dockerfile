# Build frontend stage
FROM node:16 AS frontend

WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install

COPY frontend .
RUN npm run build

# Build backend stage
FROM node:16 AS backend

WORKDIR /app/backend
COPY backend/package*.json ./
RUN npm install

COPY backend .
COPY --from=frontend /app/frontend/dist ./public

EXPOSE 3000

CMD ["npm", "start"]
