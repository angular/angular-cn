#!/usr/bin/env bash

. /Users/twer/.nvm/nvm.sh

set -x
set -e

commitSha=$(git rev-parse --short HEAD)
commitMessage=$(git log --oneline -n 1)

cd `dirname $0`

yarn build
ts-node ./tools/translator/bin/ssr.ts

rm -fr ng-docs.github.io

git clone git@github.com:ng-docs/ng-docs.github.io.git

cp -r dist/* ./ng-docs.github.io/

cd ./ng-docs.github.io

cp index.html 404.html
git add .
git commit --allow-empty -am "${commitMessage}"

git push

cd -
