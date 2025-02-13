FROM node:18-slim


RUN apt-get update && \
    apt-get install -y wget gnupg curl xauth x11-utils x11-apps xvfb dbus dbus-x11 && \
    wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - && \
    sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' && \
    apt-get update && \
    apt-get install -y \
    google-chrome-stable \
    fonts-ipafont-gothic \
    fonts-wqy-zenhei \
    fonts-thai-tlwg \
    fonts-kacst \
    fonts-freefont-ttf \
    libxss1 \
    libasound2 \
    libatk-bridge2.0-0 \
    libatk1.0-0 \
    libcups2 \
    libdbus-glib-1-2 \
    libgtk-3-0 \
    libx11-xcb1 \
    libxcomposite1 \
    libxdamage1 \
    libxfixes3 \
    libxrandr2 \
    libgbm1 \
    libpango-1.0-0 \
    libpangocairo-1.0-0 \
    libgdk-pixbuf2.0-0 \
    libxkbcommon0 \
    libnss3 \
    dbus-x11 \
    xvfb \
    --no-install-recommends && \
    rm -rf /var/lib/apt/lists/*


RUN dbus-uuidgen > /etc/machine-id

WORKDIR /app


COPY package*.json ./
RUN npm install --omit=dev


COPY . .


ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome-stable
ENV DISPLAY=:99
ENV DBUS_SESSION_BUS_ADDRESS=/dev/null


RUN mkdir -p /app/tmp && chmod -R 777 /app/tmp
ENV CHROME_BIN=/usr/bin/google-chrome-stable
ENV PUPPETEER_DISABLE_SANDBOX=true


CMD ["sh", "-c", "Xvfb :99 -screen 0 1920x1080x24 & export DISPLAY=:99 && sleep 2 && npm run dev"]