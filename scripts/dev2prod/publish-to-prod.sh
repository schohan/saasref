#!/bin/bash


## Copy the latest changes from local database to prod.
curDir=$(basename "$(pwd)")

# Check if the current directory name matches the expected name
if [ "$curDir" != "dev2prod" ]; then
  echo "Error: You can run this command from ./db directory only."
  exit 1
fi


if [ $# -ne 1 ]; then
    echo 'Specify categoryPath. `e.g. ./publish-to-pro.sh "launch/social-media-management" `'
    exit 1;
fi

# This category documents will be copied from local webcontent to prod webcontent
export CATEGORY_PATH=$1

echo "Category path $CATEGORY_PATH "

./export-from-local.sh 
./import-in-prod.sh
