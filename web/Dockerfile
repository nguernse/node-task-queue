FROM node:18.17.1-alpine

WORKDIR /app

COPY package*.json .

RUN npm ci

COPY . .

CMD ["npm", "run", "dev"]