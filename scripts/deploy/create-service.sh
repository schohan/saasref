#!/bin/bash

PROJECT_ID="baas-web-content"   # Replace with your Google Cloud project ID
SERVICE_NAME="web-content-app"    # Replace with the desired Cloud Run service name
IMAGE_URL="gcr.io/$PROJECT_ID/$SERVICE_NAME"  # Image URL for GCR

# Check if the service already exists
EXISTING_SERVICE=$(gcloud run services describe "$SERVICE_NAME" --project "$PROJECT_ID" --format="value(status.url)" 2>/dev/null)

if [ -z "$EXISTING_SERVICE" ]; then
  # The service does not exist, so create the Docker image repository on GCR
  gcloud artifacts repositories create "$SERVICE_NAME-repo" \
    --repository-format=docker \
    --location=us-central1  # Replace with your desired location

#   # Build and push the Docker image to GCR
#   gcloud builds submit --tag="$IMAGE_URL" .

#   # Deploy the Cloud Run service
#   gcloud run deploy "$SERVICE_NAME" \
#     --image="$IMAGE_URL" \
#     --platform=managed \
#     --region=us-central1  # Replace with your desired region
else
  echo "Service '$SERVICE_NAME' already exists."
fi
