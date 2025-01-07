FROM node:20-alpine

WORKDIR /server

RUN apk add --no-cache openssl curl bash


COPY package*.json ./

COPY . .

RUN npm install

RUN npx prisma generate


CMD npm run dev

