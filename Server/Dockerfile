FROM node:20-alpine


WORKDIR /server


RUN apk add --no-cache openssl curl bash ffmpeg


COPY package*.json ./


RUN npm install


COPY prisma ./prisma
RUN npx prisma generate


COPY . .


EXPOSE 8080


ENV DATABASE_URL="postgresql://default:password@localhost/db"


CMD ["npm", "run", "dev"]

