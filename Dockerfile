FROM node:14.17.3

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . ./

EXPOSE 8000 3306

# RUN npx prisma db push
RUN npm run build
