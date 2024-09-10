#!/bin/sh

SERVICE_NAME="web-content-app"
PROJECT_ID=baas-web-content
BRANCH=`git rev-parse --abbrev-ref HEAD`
DATE=$(date "+%Y-%m-%d-%H%M")
APP="$SERVICE_NAME:${BRANCH}${DATE}"


#change project to beta/prod project
 gcloud config set project $PROJECT_ID

# Add test to find current director. This script should run from project root where Dockerfile is present. 
BASEDIR="$(pwd)"
echo "Base dir $BASEDIR"

#Tag
#./scripts/deploy/tag-release.sh 'version-prod'
if [ $? -ne 0 ]; then
    echo 'Could not tag this release. Make sure git is properly installed and you are running this script from project root. `e.g. ./scripts/deploy-prod.sh`'
    exit 1;
fi

#Build App
pnpm run build:prod

if [ $? -ne 0 ]; then
    echo 'Could not build application'
    exit 1;
fi
  
# Build google image
gcloud builds submit --tag gcr.io/$PROJECT_ID/${APP} 

if [ $? -eq 0 ]; then
    # Deploy the image
    gcloud run deploy $SERVICE_NAME --image gcr.io/$PROJECT_ID/${APP} --platform managed --region us-east4
    
fi

