#!/bin/bash

#
# This script will download jobs google sheet and upload it on to mongoDB for given environment. 
# Script expects an <ENV>_DB_URL variable set that contains the database connection URL. You can configure it in user's home settings or 
# set it at run time.
#

# Capture args
ENV=$1
ARGCNT=$#
DOWNLOADED_FILE_NAME='jobs.csv'

# Select the DB_URL based on environment. Default is Development
DB_URL='' 

function validateArgs() {
    if [[ $ARGCNT != 1  ]]; then
        printf "Usage:\\n"
        printf "./loadJobsData.sh <dev|stage|prod> \\n"
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

    validateArgs

    # Sheets to load data from. TODO: iterate over these while downloading/loading data
    JOBS_SHEET="https://docs.google.com/spreadsheets/d/1521PA_AuBID0DLFeFbnTulaE1xG3sc9G7aXtTyPrKI8/gviz/tq?tqx=out:csv&sheet="
    DATA_DIR="./tempdata"
    
    # Create dir to store downloaded data as csv format
    if [ ! -d ${DATA_DIR} ]; then
        echo "making directory $DATA_DIR"
        exec mkdir "$DATA_DIR" && chmod +rw "$DATA_DIR"      
    fi
    echo "Initializing Done."
}


function downloadDataFromSheets() {
     echo "Downloading sheets - Start ..."
    # download sheets
    wget -q -O "$DATA_DIR/$DOWNLOADED_FILE_NAME" "$JOBS_SHEET"

    echo "Downloading - Done."
}

function uploadDataToDB() {
    echo "Loading data from file '$DATA_DIR/$DOWNLOADED_FILE_NAME' to the database $DB_URL - Start"
    
    # upload data 
    mongoimport --uri $DB_URL -c jobs --file "$DATA_DIR/$DOWNLOADED_FILE_NAME" --type csv --maintainInsertionOrder --ignoreBlanks --mode=upsert --headerline --drop
    
    echo "Uploading - Done."
  }


function main() {
    validateArgs

    # Initialize
    init

    #Download data from sheets
    downloadDataFromSheets

    # Load data to database
    uploadDataToDB
}

main