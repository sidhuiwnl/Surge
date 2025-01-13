FROM ghcr.io/puppeteer/puppeteer:23.11.1

ENV DEBIAN_FRONTEND=noninteractive

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome

# Install dependencies and Google Chrome
RUN apt-get update && apt-get install -y software-properties-common && \
    apt-get install -y \
        curl \
        gconf-service libasound2 libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 \
        libexpat1 libfontconfig1 libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 \
        libglib2.0-0 libgtk-3-0 libnspr4 libpango-1.0-0 libpangocairo-1.0-0 \
        libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 \
        libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 \
        libxtst6 ca-certificates fonts-liberation libappindicator1 libnss3 \
        lsb-release xdg-utils wget x11vnc x11-xkb-utils xfonts-100dpi \
        xfonts-75dpi xfonts-scalable xfonts-cyrillic x11-apps \
        libxss1 libgbm1 libdrm2 xvfb && \
    wget -q -O - https://dl.google.com/linux/linux_signing_key.pub | gpg --dearmor > /usr/share/keyrings/google-chrome.gpg && \
    echo "deb [arch=amd64 signed-by=/usr/share/keyrings/google-chrome.gpg] http://dl.google.com/linux/chrome/deb/ stable main" > /etc/apt/sources.list.d/google-chrome.list && \
    apt-get update && apt-get install -y google-chrome-stable && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy dependencies and install them
COPY package*.json ./
RUN npm install

# Copy application source code
COPY . .

# Build the application
RUN npm run build

# Expose the application port
EXPOSE 3000

# Set up virtual display
ENV DISPLAY=:99

# Start Xvfb and run the application
CMD ["sh", "-c", "Xvfb :99 -screen 0 1920x1080x24 & npm run dev"]
