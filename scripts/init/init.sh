#!/bin/bash

#
# This script will load initial data into the system
# Script expects an <ENV>_DB_URL variable set that contains the database connection URL. You can configure it in user's home settings or 
# set it at run time.
#

# Capture args
ENV=$1
ARGCNT=$#

CATEGORY_FILE='categories.json'
WEBCONTENT_FILE='genContent.json'

# Select the DB_URL based on environment. Default is Development
DB_URL='' 

function validateArgs() {
    if [[ $ARGCNT != 1  ]]; then
        printf "Usage:\\n"
        printf "<env>_DB_URL='mongodb://....' ./init.sh <dev|stage|prod> \\n"
        printf "e.g. DEV_DB_URL='mongodb://localhost:27017/content-service' ./init.sh dev \\n"
        exit 1
    else
        case $ENV in 
            dev)
                DB_URL=${DEV_DB_URL}
                ;;
            stage)
                DB_URL=${STAGE_DB_URL}
                ;;
            prod)
                DB_URL=${PROD_DB_URL}          
                ;;     
            *)
                echo "unknown option" 
        esac    
        echo "Env=$ENV,  Connecting using url=$DB_URL"
    fi    
}


function init() {
    echo "Initializing - Start ..."

    echo "Initializing Done."
}


function uploadDataToDB() {
    echo "Loading data from file '$CATEGORY_FILE' to the database $DB_URL - Start"
    
    # upload data 
    mongoimport --uri $DB_URL -c categories --file "$CATEGORY_FILE" --type json --maintainInsertionOrder --mode=upsert --drop --jsonArray
    mongoimport --uri $DB_URL -c webcontents --file "$WEBCONTENT_FILE" --type json --maintainInsertionOrder --mode=upsert --drop --jsonArray
    
    echo "Uploading - Done."
  }


function main() {
    validateArgs

    # Initialize
    init

    # Load data to database
    uploadDataToDB
}

main