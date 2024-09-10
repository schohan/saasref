#!/bin/bash

# How to Run
    # Will run in Ubuntu, gitBash, or any linux command prompt
    # Needs the necessary params of
        # DB_URL - Database Url
        # LOCATION - Where the backup file will be stored, (has to be navigated to from current folder)
        # DB_NAME - Name of the database to be saved 
        # FILENAME_PREFIX - Desired name for the file (the current time in minutes will be automatically appended)
    # If running with JSON file with params
        # Put JSON file directly in the same folder as this file
        # Make sure JSON file has all the necessary params in an object
        # If JSON file is not named "data.json", please rename commands as specified below
        # Run normally with command, "./backupData.sh"
    # If running with params inserted manually, and JSON file is either intentionally left blank or excluded 
        # Run the command ./backupData.sh with params spaced out in this order
            # Database URL, Database name, Backup file location, Filename Prefix
        # EX. ./backupData.sh localhost:27017 oneskool-dev ./TestBackup MongoDBTestBackUp

    # To restore a database, use the command at the bottom of the file


# Get today's date for Filename
dt=$(date +"%H%M")
# Determine if a non-empty JSON file exists
FILE="data.json"
if [[ -s $FILE ]]; then
  # Extract appropriate data from file
  # If JSON file is not named "data.json", replace "data.json" in "cat data.json" with the appropriate file name
  DB_URL=`cat data.json | jq -r '.DB_URL'`
  LOCATION=`cat data.json | jq -r '.LOCATION'`
  DB_NAME=`cat data.json | jq -r '.DB_NAME'`
  FILENAME_PREFIX=`cat data.json | jq -r '.FILENAME_PREFIX'`
  FILENAME="${FILENAME_PREFIX}-${dt}"
 
  # Run command with variables to store data
  echo "Creating MongoDB backup with JSON params...--host=${DB_URL}"
  
  mongodump --host=${DB_URL} --gzip --db ${DB_NAME} --out "${LOCATION}/${FILENAME}"

  find $LOCATION/$FILENAME_PREFIX-* -type d -ctime +7 | xargs rm -rf 2>&1

  echo MongoDB backup finished
else
  # If JSON file does not exist, intake manual params instead
  # User Inputs
  # $1 = Database URL, $2 = Database name, $3 = Backup file location, $4 = Filename Prefix
  echo Creating MongoDB backup with manual params...
  mongodump --host=$1 --gzip --db $2 --out $3/$4-$dt

  echo MongoDB backup finished
fi 

# If the database needs to be restored, use one of these command lines with needed fields filled in
    # If credentials are un-needed
        # mongorestore --gzip -v --nsInclude="COLLECTIONAME.*" --host=HOST-NAME/NUM --port=PORT-NUM FILE-LOCATION
            # EX. mongorestore --gzip -v --nsInclude="oneskool-dev.*" --host=localhost --port=27017 ./TestBackup/MongoDBTestBackUp-1715/
    # If credentials are needed
        # mongorestore --gzip -v --nsInclude="COLLECTIONAME.*" --host=HOST-NAME/NUM --port=PORT-NUM -u="USERNAME" -p="PASSWORD" FILE-LOCATION
