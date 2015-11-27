#!/bin/bash
source properties.sh

tar -xvzf compiled/*.tar.gz
rm -rf compiled

# rebuild native packages
cd bundle/programs/server && npm install
cd ~

# setup environment variables
export MONGO_URL='mongodb://127.0.0.1:27017/putzfrau-suche'
export ROOT_URL="http://${name}"
export PORT=${port}

# start the server
forever stop bundle/main.js
forever start bundle/main.js