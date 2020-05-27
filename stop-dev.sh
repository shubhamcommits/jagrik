#!/bin/bash

# Stop development server

echo "Stoping all the node services..."

# Stops and kills the server
pm2 stop server

pm2 delete server