#!/bin/bash

## Copy the latest changes from local database to prod.
export CATEGORY_PATH=$1

# Configuration with defaults
export SOURCE_MONGO_HOST="mongodb://localhost"
source_mongo_host="${SOURCE_MONGO_HOST}"    # Replace with the actual MongoDB host for 'database1'
source_database="${SOURCE_DB}"                     # Replace with the source database name
source_collection="${SOURCE_COLLECTION}"              # Replace with the source collection name

DB="content-service"
COLLECTION="webcontents"

dump_output_directory="${OUT_DIR:-./dumps}"  # Replace with the desired dump directory path



# remove old file
rm $dump_output_directory/webcontents.json
touch $dump_output_directory/webcontents.json


CRITERIA="{\"categoryPath\": \"$CATEGORY_PATH\" }"

echo "Exporting data using CRITERIA = ${CRITERIA}"
# Dump MongoDB collection from 'dev' based on 'createdAt' date
#mongodump --host "$source_mongo_host" --port "27017" --db "$source_database" --collection "$source_collection" --query "{ 'updatedAt': { '\$gte': new Date('$start_date') } }" --out "$dump_output_directory"
#mongodump --host "localhost" --port "27017" --db "content-service" --collection "webcontents" --query "{ 'updatedAt': { '\$gte': new Date('2024-02-14') } }" --out "./dumps"
#mongoexport --db="$DB" --collection="$COLLECTION"  --query  { "createdAt" : { $gte : "2024-03-07T19:48:43Z" } } --out=$dump_output_directory/webcontents.json
mongoexport --db="$DB" --collection="$COLLECTION" --query "${CRITERIA}" --out=$dump_output_directory/webcontents.json
#$CRITERIA

# {createdAt: {$gte: ISODate('2024-03-07')}} - tested OK

# Upload the dumped data into 'prod'
#mongorestore --host "$target_mongo_host" --db "$target_database" "$dump_output_directory/$source_database/$source_collection.bson"
#mongoimport --uri "$target_mongo_host" --db=content-service --file ./dumps/webcontents.json

# Optional: Remove the dump directory if desired
# rm -r "$dump_output_directory"
