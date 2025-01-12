FROM ghcr.io/puppeteer/puppeteer:23.11.1

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome-stable

WORKDIR /usr/src/app

# Create directory and set ownership
RUN chown -R node:node /usr/src/app

# Switch to non-root user
USER node

# Copy package files with correct ownership
COPY --chown=node:node package*.json ./

RUN npm ci

# Copy rest of the files with correct ownership
COPY --chown=node:node . .

# Ensure TypeScript has write permissions for build info
RUN mkdir -p /usr/src/app/dist && \
    touch /usr/src/app/tsconfig.tsbuildinfo && \
    chmod 644 /usr/src/app/tsconfig.tsbuildinfo

CMD ["npm", "run", "dev"]