#!/bin/bash

SESSION_NAME="dev_server"
PORT=3000

screen -S "$SESSION_NAME" -X quit

echo "Stopped Node.js server running in screen session '$SESSION_NAME'."

lsof -i :$PORT -t | xargs kill

if [ $? -eq 0 ]; then
  echo "Stopped process(es) using port $PORT."
else
  echo "Failed to stop process(es) or no process found using port $PORT."
fi