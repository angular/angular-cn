#!/usr/bin/env bash

set -x
set -e

commitSha=$(git rev-parse --short HEAD)
commitMessage=$(git log --oneline -n 1)

cd `dirname $0`

yarn build
ts-node ./tools/translator/bin/ssr.ts

if [[ ! -d "./ng-docs.github.io" ]]
then
    git clone git@github.com:ng-docs/ng-docs.github.io.git ./ng-docs.github.io
fi

cd ./ng-docs.github.io

cp -r dist/* .

git add .
git commit --allow-empty -am "${commitMessage}"

git push

cd -
