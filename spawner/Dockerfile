FROM ghcr.io/puppeteer/puppeteer:23.11.1

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome-stable

# Install Xvfb and its dependencies
RUN apt-get update && apt-get install -y \
    xvfb \
    x11vnc \
    x11-xkb-utils \
    xfonts-100dpi \
    xfonts-75dpi \
    xfonts-scalable \
    xfonts-cyrillic \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /usr/src/app

# Create directory and set ownership
RUN chown -R node:node /usr/src/app

USER node

COPY --chown=node:node package*.json ./
RUN npm ci

COPY --chown=node:node . .

CMD ["./start.sh"]