FROM ghcr.io/puppeteer/puppeteer:23.11.1

ENV PUPPETEER_SKIP_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome-stable

WORKDIR /user/src/app

# Create cache directory and set permissions early
RUN mkdir -p /user/src/app/cache && \
    chown -R node:node /user/src/app

# Switch to non-root user
USER node

COPY --chown=node:node package*.json ./

RUN npm ci

COPY --chown=node:node . .

CMD ["npm","run","dev"]