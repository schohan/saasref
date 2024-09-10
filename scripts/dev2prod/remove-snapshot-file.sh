#!/bin/bash

# Set your Google Cloud Storage bucket name
BUCKET_NAME="web-content-images"
BUCKET_PATH="images/startup-kit/screenshots"

DOMAIN=$1

# Set the local directory path
LOCAL_DIR="/Users/shailenderchohan/projects/startupkit/static/screenshots"

# Set the date threshold in the format YYYY-MM-DD (e.g., 2023-01-01)
echo "Removing file: ${DOMAIN}.jpeg"
# Remove the file from the Google Cloud Storage bucket
gsutil rm "gs://$BUCKET_NAME/$BUCKET_PATH/$DOMAIN.jpeg"

rm "$FILE_PATH" "$LOCAL_DIR/copied/$DOMAIN.jpeg" 
