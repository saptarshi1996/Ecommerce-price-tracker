FROM node:18.13.0

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

EXPOSE 8081

RUN npm run db:generate
RUN npm run build

CMD [ "./entrypoint.sh" ]
