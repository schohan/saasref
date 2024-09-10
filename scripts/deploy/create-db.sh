# create new database for the service
mongo --host <your_remote_host> --port <your_remote_port> --eval "db.getSiblingDB('<your_database_name>').createCollection('dummy')"
