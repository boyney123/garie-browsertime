#!/bin/sh
set -e


if [ -n "$CONFIG" ]; then
	echo "Found configuration variable, will write it to the /usr/src/garie-browsertime/config.json"
	echo "$CONFIG" > /usr/src/garie-browsertime/config.json
fi

exec "$@"
