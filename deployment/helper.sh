# Your app name, adapt
appName=help2clean-angular
rootUrl='http://putzfrau-suche.ch'

tar -xvzf compiled/${appName}.tar.gz
rm -rf compiled

# rebuild native packages
cd bundle/programs/server && npm install
cd ~

# setup environment variables
export MONGO_URL='mongodb://127.0.0.1'
export ROOT_URL=${rootUrl}
export PORT=80

# start the server
killall -9 node
node bundle/main.js