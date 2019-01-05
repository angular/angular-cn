#!/usr/bin/env bash

set -x
set -e

commitSha=$(git rev-parse --short HEAD)
commitMessage=$(git log --oneline -n 1)

cd `dirname $0`

yarn build

yarn start &

sleep 10

yarn update-webdriver

yarn prerender

if [[ ! -d "./ng-docs.github.io" ]]
then
    git clone https://asnowwolf:${GITHUB_ACCESS_TOKEN}@github.com/ng-docs/ng-docs.github.io.git ./ng-docs.github.io
fi

cp -r dist/* ./ng-docs.github.io

cd ./ng-docs.github.io

git add .
git commit --allow-empty -am "${commitMessage}"

git push

cd -
