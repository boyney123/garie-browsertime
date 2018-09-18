#!/usr/bin/env bash
echo "Start getting data"
echo "Saving reports into $REPORT_DIR/reports"

echo "Getting data for: $1"

docker run --shm-size=1g -v $REPORT_DIR/reports:/browsertime sitespeedio/browsertime $1

echo "Finished getting data for: $1"

exit 0

