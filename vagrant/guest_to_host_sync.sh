#!/bin/bash

SRC="/home/vagrant/gokit/"
DST="/works/gokit"
EXCLUDES="--exclude=node_modules --exclude=.git --exclude=dist --exclude=tmp --exclude=.vagrant"

while true; do
  rsync -av --delete $EXCLUDES "$SRC" "$DST"
  sleep 5
done