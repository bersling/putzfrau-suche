source properties.sh
now=$(date +%s)
ssh ${server} mongodump --host 127.0.0.1 --port 27017 --db putzfrau-suche --out ~/dumps/${now}

# to restore, go to dumped folder and run:
#mongorestore --host 127.0.0.1 --port 27017 --db putzfrau-suche --drop ./putzfrau-suche
