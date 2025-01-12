#!/usr/bin/env bash
#exit on error
set -o errexit

# Install dependencies
npm install

# Build project
npm run build

# Create all necessary directories
RENDER_CACHE_DIR=/opt/render/project/src/.cache/puppeteer/chrome
PUPPETEER_CACHE_DIR=/opt/render/.cache/puppeteer

mkdir -p $RENDER_CACHE_DIR
mkdir -p $PUPPETEER_CACHE_DIR

# Install Puppeteer and download Chrome
npx puppeteer browsers install chrome

# Store/pull Puppeteer cache with build cache
if [[ ! -d $PUPPETEER_CACHE_DIR ]]; then
    echo "...Copying Puppeteer Cache from Build Cache"
    # Create parent directories if they don't exist
    mkdir -p $(dirname $PUPPETEER_CACHE_DIR)
    cp -R $RENDER_CACHE_DIR $PUPPETEER_CACHE_DIR
else
    echo "...Storing Puppeteer Cache in Build Cache"
    # Create parent directories if they don't exist
    mkdir -p $(dirname $RENDER_CACHE_DIR)
    cp -R $PUPPETEER_CACHE_DIR $RENDER_CACHE_DIR
fi