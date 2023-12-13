FROM node:20.6.0-alpine3.17

ENV NODE_ENV=dev

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080

CMD ["npm", "run", "dev"]