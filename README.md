# Tools & Serviecs

Code to fork and build a basic web application with key tools and utils.


## Process to add Content

1. Add new URLs and preferrably categoryPath also as it is needed later anyway using Postman POST
2. Run "processing" action on newly added content using Postman.
3. Review content using '/admin' page to make sure screenshots and text looks good enough. Failed content requires manual modifications/fixes.
4. Upload images to Google Cloud Storage bucket using script/storage/upload-snapshot.sh
5. Approve and Publish content and view it in DEV/STAGING.
6. Export newly added content json using script/db/export-from-local.sh and after verification, script/db/import-to-prod.sh

## General improvements

- Enhance detail page
- Add support for search by tags and categories
- Add logger support to see file and line numbers in error messages
- make sidebar mobile friendly

## For Production Run

- To run in Production, ensure Google API, DB URL are supplied as env variables.

## Features TODOs

- Add SEO support
- Add ads support
- Add analytics with low level tracking
- Add fav. saving feature using local storage
- Add login support to support fav. storage
- Add support for sponsored links
- Check links for validity every 30(configurable) days or so to ensure bad links are removed. Validty is checked when results are returned as part of result. Validty is also checked for old links that are never returned as part of result.
-  

## Resources




