#!/usr/bin/env bash
echo "Start getting data"

docker_id=$( cat /proc/self/cgroup | head -n 1 | sed  's#.*/\([0-9a-fA-F]*\)$#\1#' )

REPORTDIR=$(docker inspect $docker_id | grep :/usr/src/garie-browsertime/reports | awk -F'["|:]' '{print $2}')

echo "Saving reports into $REPORTDIR"

echo "Getting data for: $1"

docker run --rm --shm-size=1g -v $REPORTDIR:/browsertime sitespeedio/browsertime $1

echo "Finished getting data for: $1"

exit 0

