#!/usr/bin/env bash
DOCKER_LOCATION=$((which docker) 2>&1)
REPORT_DIR=$(pwd) docker-compose up