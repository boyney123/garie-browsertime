#!/usr/bin/env bash
echo "Start getting data"

echo "Getting data for: $1"

echo $(pwd)

docker run --shm-size=1g --rm -v "$(pwd)"/reports:/browsertime sitespeedio/browsertime $1

echo "Finished getting data for: $1"

exit 0
