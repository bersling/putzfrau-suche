source properties.sh
ssh ${server} mongodump --host 127.0.0.1 --port 27017 --db putzfrau-suche

# to restore:
#mongorestore --host 127.0.0.1 --port 27017 --db <dbname> --drop <path>/<to>/<dump>/<database-name>
