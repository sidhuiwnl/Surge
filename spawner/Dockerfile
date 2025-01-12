FROM ghcr.io/puppeteer/puppeteer:23.11.1

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome-stable

WORKDIR /user/src/app

COPY package*.json ./


COPY . .

RUN mkdir -p /user/src/app/cache && chmod -R 777 /user/src/app

CMD ["npm","run","dev"]

