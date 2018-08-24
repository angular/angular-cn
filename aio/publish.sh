#!/usr/bin/env bash

. ~/.nvm/nvm.sh

nvm use 8

set -x

cd `dirname $0`

yarn build
rm -fr ../../ng-docs.github.io/*
cp -r dist/* ../../ng-docs.github.io
cd ../../ng-docs.github.io
cp index.html 404.html
echo v6.angular.live > CNAME
echo angular.cn >> CNAME
echo www.angular.cn >> CNAME
git add .
git commit -am "publish"

git push

cd -
