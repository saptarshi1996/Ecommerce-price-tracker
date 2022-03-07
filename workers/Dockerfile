FROM node:14.17.3

WORKDIR /app

EXPOSE 20010

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build
