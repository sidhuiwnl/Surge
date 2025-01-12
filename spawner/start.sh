RUN echo 'Xvfb :99 -screen 0 1024x768x16 & \n\
export DISPLAY=:99 \n\
npm run dev' > start.sh \
    && chmod +x start.sh