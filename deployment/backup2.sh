now=$(date +%s)
mongodump --host 127.0.0.1 --port 27017 --db putzfrau-suche --out ~/dumps/${now}
