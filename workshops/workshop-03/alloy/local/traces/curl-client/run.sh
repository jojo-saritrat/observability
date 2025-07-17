#!/bin/sh
echo "Starting curl client..."
while true; do
  curl -s -o /dev/null http://python-server:8080
  echo "Request sent to python-server"
  sleep 5
done