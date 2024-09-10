#!/bin/bash

# Set your Google Cloud Storage bucket name
BUCKET_NAME="<bucket-name>"

BUCKET_PATH="images/startup-kit/screenshots"
# Set the local directory path
LOCAL_DIR="<local-dir>"

# Set the date threshold in the format YYYY-MM-DD (e.g., 2023-01-01)
THRESHOLD_DATE=$1
OVERRIDE=true
echo "Setting the date threshold in the format YYYY-MM-DD (e.g., 2023-01-01) $THRESHOLD_DATE"

# Iterate through files in the local directory
for FILE_PATH in "$LOCAL_DIR"/*
do
  # Get the creation date of the file
  CREATE_DATE=$(stat -f %B "$FILE_PATH")
  
  # Convert the creation date to YYYY-MM-DD format
  CREATE_DATE_FORMATTED=$(date -r $CREATE_DATE +"%Y-%m-%d")
  
  # Extract the filename from the local file path
  LOCAL_FILE_NAME=$(basename "$FILE_PATH")

  # Compare the creation date with the threshold date
  if [[ "$CREATE_DATE_FORMATTED" > "$THRESHOLD_DATE" ]]
  then
    echo "Processing: $LOCAL_FILE_NAME"
    if gsutil ls "gs://$BUCKET_NAME/$BUCKET_PATH/$LOCAL_FILE_NAME" 2>&1 | grep -q "CommandException: One or more URLs matched no objects."; 
    then
        # Upload the file to the Google Cloud Storage bucket
        gsutil cp "$FILE_PATH" "gs://$BUCKET_NAME/$BUCKET_PATH/$LOCAL_FILE_NAME"
        echo "Uploaded: $LOCAL_FILE_NAME"
        mv "$FILE_PATH" "$LOCAL_DIR/copied" 
    else
        # File already exists, provide a message or take alternative action
        echo "File: '$LOCAL_FILE_NAME' already exists in the bucket."
    fi
  fi
done
