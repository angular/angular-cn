#!/usr/bin/env bash

set -x
set -e

commitSha=$(git rev-parse --short HEAD)
commitMessage=$(git log --oneline -n 1)

cd `dirname $0`

yarn build

yarn preview

pid=$!

sleep 3;

npx ts-node --project=./tools/translator/tsconfig.json ./tools/translator/bin/prerender.ts

kill -9 ${pid}

if [[ ! -d "./preview.angular.cn" ]]
then
    git clone git@github.com:ng-docs/preview.angular.cn.git ../preview.angular.cn
fi

cp -r dist/* ./preview.angular.cn

cd ./preview.angular.cn

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
