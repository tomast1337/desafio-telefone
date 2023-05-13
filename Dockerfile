FROM node:14

WORKDIR /app

# copy backend and frontend code to the container

COPY backend
COPY frontend

# install backend and frontend dependencies

WORKDIR /app/backend

RUN npm install

WORKDIR /app/frontend

RUN npm install

# build frontend

RUN npm run build

# copy frontend build to backend

RUN cp -r /app/frontend/dist /app/backend/public

WORKDIR /app/backend

EXPOSE 3000

CMD ["npm", "start"]
