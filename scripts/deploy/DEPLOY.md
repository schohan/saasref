# Deployment Notes

## Setup

- Create Google Cloud Service for Cloud Run.

```bash
./create-service.sh
```

- Create a new database to host collections

```bash
./create-db.sh
```

## Deploy Code

```bash
./deploy.sh
```

After first deployment, configure the Cloud Run service with environment variables like DB_URL, API Keys etc. See config.js for details.

## Regular Data Updates

Data is loaded into DEV database and once everything is tested, PROD database can be updated.

Follower command picks the updates from DEV db using either supplied since date or by default it picks the last updatedAt date in PROD db for a given collection.

```bash
 /db/update-prod.sh 
 ```

A shortcut bash script 'default-update.sh' with actual DB URLs will be created but not commited to Git.

### Generating Sitemap

Invoke endpoint:
```bash
/api/admin/sitemap
```
