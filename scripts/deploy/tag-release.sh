#!/bin/sh

BRANCH=`git rev-parse --abbrev-ref HEAD`
DATE=$(date "+%Y-%m-%d-%H%M")

TAG="${BRANCH}-${DATE}"

# Add tag to git repo
git tag -a "v${BRANCH}.${DATE}" -m "${TAG}"

# Update version of the file 
if [ "$?" == 0 ]; then
    filename="${1}"
    echo "Tagged Git with tag = ${TAG}"
    echo "v${TAG}" > static/${filename}
fi

git commit -am 'updated version'
git push origin "${TAG}"
