#!/usr/bin/env bash

set -x
set -e

commitSha=$(git rev-parse --short HEAD)
commitMessage=$(git log --oneline -n 1)

cd `dirname $0`

yarn build
ts-node ./tools/translator/bin/ssr.ts

if [[ ! -d "/tmp/angular-cn" ]]
then
    git clone git@github.com:ng-docs/ng-docs.github.io.git /tmp/angular-cn
fi

cp -r dist/* /tmp/angular-cn/

cd /tmp/angular-cn/

git add .
git commit --allow-empty -am "${commitMessage}"

git push

cd -
