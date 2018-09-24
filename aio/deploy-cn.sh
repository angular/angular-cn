#!/usr/bin/env bash

. ~/.nvm/nvm.sh

nvm use 8

set -x

commitSha=$(git rev-parse --short HEAD)
commitMessage=$(git log --oneline -n 1)

cd `dirname $0`

yarn build
ts-node ./tools/translator/bin/ssr.ts
cp -r dist/* ../../ng-docs.github.io/
cd ../../ng-docs.github.io

cp index.html 404.html
git add .
git commit --allow-empty -am "${commitMessage}"

git push

cd -
