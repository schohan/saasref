# This folder contains all infrastructure scripts.

## 'scripts' folder
Contains scripts for
- Seeding a new database
- Admin scripts 

## 'migrations' folder
Contains DB migration scripts.


# How to setup 

- Run mongo migrations from src/infra/data folder to setup database
- Init pnpm and run 
```bash
pnpm install
pnpm dev
```

# How to operate
Do the following to add new features/models/routes etc.

## Add new model and routes
- Create model usiing mongo migrations
- Create model class and routes files
- Create backend routes under /api base.
- Use <model>-service.ts class to capture all feature/functions supported by various api routes

## How to deploy
Run script "deploy-<env>" under /src/infra/deploy.

For the first time, create a service in Google Cloud run and use that service ID for deployment.
