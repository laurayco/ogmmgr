#!/bin/sh

# step one: build
npm run build

# step two: run
npm run start

# step three: switch to gh-pages branch.
git checkout gh-pages

# step four: pull to avoid conflicts.
git pull

# step five: move everything from www to root folder.
pushd www
mv *.* ..
popd

# step six: push updates to github
git push

# step seven: checkout master again.
git checkout master