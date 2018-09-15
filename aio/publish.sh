#!/usr/bin/env bash

. ~/.nvm/nvm.sh

nvm use 8

set -x

cd `dirname $0`

yarn build
cp -r dist/* ../../ng-docs.github.io/
cd ../../ng-docs.github.io

cp index.html 404.html
git add .
git commit -am "publish"

git push

cd -
