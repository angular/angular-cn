#!/usr/bin/env bash

set -x
set -e

commitSha=$(git rev-parse --short HEAD)
commitMessage=$(git log --oneline -n 1)

cd `dirname $0`

yarn build

yarn preview > /tmp/preview.log &

pid=$!

sleep 3;

npx ts-node --project=./tools/translator/tsconfig.json ./tools/translator/bin/prerender.ts

kill -9 ${pid}

if [[ ! -d "./ng-docs.github.io" ]]
then
    git clone https://asnowwolf:${GITHUB_ACCESS_TOKEN}@github.com/ng-docs/preview.angular.cn.git ./ng-docs.github.io
fi

cp -r dist/* ./ng-docs.github.io

cd ./ng-docs.github.io

git add ./generated/docs/api/
git commit --allow-empty -am "${commitMessage}"
git add ./generated/docs/guide/
git commit --amend --allow-empty -am "${commitMessage}"
git add ./generated/docs/
git commit --amend --allow-empty -am "${commitMessage}"
git add ./generated/images/
git commit --amend --allow-empty -am "${commitMessage}"
git add .
git commit --amend --allow-empty -am "${commitMessage}"

git push

cd -
