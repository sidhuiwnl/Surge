FROM node:20-bullseye


WORKDIR /server


RUN apt-get update && apt-get install -y --no-install-recommends \
    ffmpeg \
    openssl \
    curl \
    bash \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*


COPY package*.json ./


RUN npm install


COPY prisma ./prisma
RUN npx prisma generate


COPY . .


EXPOSE 8080





CMD ["npm", "run", "dev"]

