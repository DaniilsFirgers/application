#!/bin/bash

echo "Starting server in the background..."

screen -dmS dev_server bash -c 'npm start'

echo "Server started in the background with name 'dev_server'."

exec "$@"