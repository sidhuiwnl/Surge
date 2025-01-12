FROM ghcr.io/puppeteer/puppeteer:23.11.1

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome-stable

WORKDIR /user/src/app

COPY package*.json ./


COPY . .



CMD ["npm","run","dev"]

